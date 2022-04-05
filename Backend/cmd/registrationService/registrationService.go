package main

import (
	"Backend/internal/serverApiRegistration"
	"Backend/internal/store"
	"flag"
	"net/http"
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

	if err := config.InitViper(configData.StorePath); err != nil {
		logger.Fatal("Cannot initiate viper", zap.Error(err))
	}

	logger.Info("Viper initiated")

	configStore, err := config.ParseStoreConfig()

	if err != nil {
		logger.Fatal("Cannot Unmarshal store config file", zap.Error(err))
	}

	st := store.New(configStore)
	if err := st.Open(); err != nil {
		logger.Fatal("Cannot open the storage", zap.Error(err))
	}
	s := serverApiRegistration.New(st)

	r := mux.NewRouter()

	r.HandleFunc("/test", s.HandleTest())

	http.Handle("/", r)

	srv := &http.Server{
		Handler: r,
		Addr: configData.HTTPServer.Endpoint,
		WriteTimeout: time.Duration(configData.HTTPServer.WriteTimeout * int(time.Second)),
		ReadTimeout: time.Duration(configData.HTTPServer.ReadTimeout * int(time.Second)),
	}

	logger.Fatal("http listen and serve: ", zap.Error(srv.ListenAndServe()))

}
