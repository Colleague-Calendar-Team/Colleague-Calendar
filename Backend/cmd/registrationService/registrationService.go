package main

import (
	"Backend/internal/serverApiRegistration"
	"Backend/internal/store/sqlstore"
	"Backend/internal/tokenStore"
	"database/sql"
	"flag"
	"fmt"
	"net/http"
	"regexp"
	"time"

	"Backend/config"
	"Backend/internal/logging"
	"log"

	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

var (
	configDir *string
)

func init() {
	configDir = flag.String("config_dir", ".", "directory for configuration file")
}

func main() {
	logLevel := flag.String("log_level", "info", "log level")
	flag.Parse()

	logger := logging.LoggerSetup(*logLevel)

	defer func() {
		if err := logger.Sync(); err != nil {
			log.Fatalf("logger.Sync: %v", err)
		}
	}()

	if err := config.InitViper(*configDir); err != nil {
		logger.Fatal("Cannot initiate viper", zap.Error(err))
	}

	logger.Info("Viper initiated")

	configData, err := config.ParseRegistrationServiceConfig()

	if err != nil {
		logger.Fatal("Cannot Unmarshal config file", zap.Error(err))
	}

	// initiate token storage
	mc := &tokenStore.Client{}
	if err := config.InitViper(configData.TokenStore.ConfigDir); err != nil {
		logger.Error("Cannot initiate viper", zap.Error(err))
	} else {
		logger.Info("Viper initiated")

		configTokenStore, err := config.ParseTokenStoreConfig()

		if err != nil {
			logger.Error("Cannot Unmarshal store config file", zap.Error(err))
		} else {
			mc, err = tokenStore.NewMemcached(configTokenStore)
			if err != nil {
				logger.Error("Cannot initialized memcached client", zap.Error(err))
			}
			logger.Info("Memcached client initialized", zap.Error(err))
		}
	}

	// initiate data storage
	if err := config.InitViper(configData.Store.ConfigDir); err != nil {
		logger.Fatal("Cannot initiate viper", zap.Error(err))
	}

	logger.Info("Viper initiated")

	configStore, err := config.ParseStoreConfig()

	if err != nil {
		logger.Fatal("Cannot Unmarshal store config file", zap.Error(err))
	}

	db, err := newDB(configStore)
	if err != nil {
		logger.Fatal("Cannot open the storage", zap.Error(err))
	}
	defer db.Close()

	st := sqlstore.New(db)
	s := serverApiRegistration.New(st, mc)

	r := mux.NewRouter()
	configureRouter(r, s)
	http.Handle("/", r)

	srv := &http.Server{
		Handler:      r,
		Addr:         configData.HTTPServer.Endpoint,
		WriteTimeout: time.Duration(configData.HTTPServer.WriteTimeout * int(time.Second)),
		ReadTimeout:  time.Duration(configData.HTTPServer.ReadTimeout * int(time.Second)),
	}

	logger.Fatal("http listen and serve: ", zap.Error(srv.ListenAndServe()))

}

// newDB ...
func newDB(configStore *config.StoreConfig) (*sql.DB, error) {
	dburl := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", configStore.DatabaseURL.Host, configStore.DatabaseURL.Port, configStore.DatabaseURL.User, configStore.DatabaseURL.Password, configStore.DatabaseURL.DBname, configStore.DatabaseURL.SSLmode)
	re := regexp.MustCompile(`[a-z]*= `)
	dburl = re.ReplaceAllString(dburl, "")

	db, err := sql.Open("postgres", dburl)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

// ConfigureRouter ...
func configureRouter(r *mux.Router, s *serverApiRegistration.ServerApiRegistration) {
	r.HandleFunc("/auth/register", s.HandleRegisterUser()).Methods("POST")
	auth := r.PathPrefix("/auth").Subrouter()
	auth.Use(s.AuthenticateUser)
	auth.HandleFunc("/whoami", s.HandleWhoami()).Methods("GET")

}
