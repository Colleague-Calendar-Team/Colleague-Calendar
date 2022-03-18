package main

import (
	"Backend/internal/serverApiRegistration"
	"flag"

	"log"
	"Backend/config"
	"Backend/internal/logging"
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

	s := serverApiRegistration.New(configData, logger)
	if err := s.Start(); err != nil {
		logger.Fatal("Cannot run server", zap.Error(err))
	}

}
