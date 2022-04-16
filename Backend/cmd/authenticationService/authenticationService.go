package main

import (
	"Backend/internal/dbUtils"
	"Backend/internal/memcached"
	"Backend/internal/serverApiRegistration"
	"Backend/internal/store/sqlstore"
	"flag"
	"net/http"
	"time"

	"Backend/config"
	"Backend/internal/logging"
	"log"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

func main() {
	configDir := flag.String("config_dir", ".", "directory for configuration file")
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
	mc, err := memcached.NewMemcached(configData.Memcached)
	if err != nil {
		logger.Fatal("Cannot initialized memcached client", zap.Error(err))
	}
	logger.Info("Memcached client initialized", zap.Error(err))

	// initiate data storage
	db, err := dbUtils.NewDB(configData.Storage)
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

// configureRouter ...
func configureRouter(r *mux.Router, s *serverApiRegistration.ServerApiRegistration) {
	r.Use(handlers.CORS(handlers.AllowedOrigins([]string{"*"})))
	auth := r.PathPrefix("/auth").Subrouter()
	//auth.Use()
	auth.HandleFunc("/login", s.HandleAuthenticateUser()).Methods("POST")
}
