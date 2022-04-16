package main

import (
	"Backend/config"
	"Backend/internal/logging"
	"flag"
	"fmt"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
	"log"
	"net/http"
	"net/smtp"
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

	r := mux.NewRouter()

	r.HandleFunc("/notification-service/email/send",
		func(w http.ResponseWriter, r *http.Request) {
			defer r.Body.Close()
			//vars := mux.Vars(r)
			//chatID, err := strconv.ParseInt(vars["chatID"], 10, 64)

			// bodyBytes, err := io.ReadAll(r.Body)
			if err != nil {
				logger.Error("reading request body", zap.Error(err))
				return
			}
			//bodyString := string(bodyBytes)

			if err := send("calleaguecallendar@mail.ru", "n7He0T1u9r3yuWQEVDGJ",
				"smtp.mail.ru:587", "smtp.mail.ru", "ilya.nyrkov@gmail.com",
				"hello there", "notification"); err != nil {
				logger.Error("sending smtp message ", zap.Error(err))
				return
			}

			w.WriteHeader(http.StatusOK)

			if _, err := fmt.Fprintf(w, "message sent"); err != nil {
				logger.Error("error writing http answer", zap.Error(err))
				return
			}
		},
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

func send(from string, pass string, smtpEndpoint string, smtpHost string, to string, body string, subject string) error {

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject:" + subject + "\n\n" +
		body

	return smtp.SendMail(smtpEndpoint,
		smtp.PlainAuth("", from, pass, smtpHost),
		from, []string{to}, []byte(msg))
}
