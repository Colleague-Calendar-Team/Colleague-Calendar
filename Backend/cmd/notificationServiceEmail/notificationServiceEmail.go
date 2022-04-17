package main

import (
	"Backend/config"
	"Backend/internal/email"
	"Backend/internal/logging"
	"Backend/internal/notificationServiceServers"
	"flag"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
	"log"
	"net/http"
	"time"
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

	configData, err := config.ParseNotificationServiceEmailConfig()

	if err != nil {
		logger.Fatal("Cannot Unmarshal config file", zap.Error(err))
	}

	mailSender := email.NewNotificationSender(
		configData.Email.Login,
		configData.Email.Pass,
		configData.Email.SMTPServerEndpoint,
		configData.Email.SMTPServerHost)

	serverEmailNotification := notificationServiceServers.NewServerEmailNotifications(mailSender)

	r := mux.NewRouter()

	r.HandleFunc("/notification-service/email/send",
		serverEmailNotification.SendNotification,
	)

	http.Handle("/", r)

	srv := &http.Server{
		Handler:      r,
		Addr:         configData.HTTPServer.Endpoint,
		WriteTimeout: time.Duration(configData.HTTPServer.WriteTimeout * int(time.Second)),
		ReadTimeout:  time.Duration(configData.HTTPServer.ReadTimeout * int(time.Second)),
	}

	logger.Fatal("http listen and serve: ", zap.Error(srv.ListenAndServe()))

}
