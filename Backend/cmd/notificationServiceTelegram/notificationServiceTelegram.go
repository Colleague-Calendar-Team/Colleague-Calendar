package main

import (
	"Backend/internal/telegramBotApi"
	"flag"
	"fmt"
	"io"

	"log"
	"net/http"
	"strconv"
	"time"

	"Backend/config"
	"Backend/internal/logging"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
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

	if err := config.InitViper(*configDir); err != nil {
		logger.Fatal("Cannot initiate viper", zap.Error(err))
	}

	logger.Info("Viper initiated")

	configData, err := config.ParseBotConfig()

	if err != nil {
		logger.Fatal("Cannot Unmarshal config file", zap.Error(err))
	}

	// setup finished
	// !!!!!!!!!!!!!REMOVE FROM CONFIG YAML BEFORE COMMITTING!!!!!!!!!!!
	bot, err := tgbotapi.NewBotAPI(configData.Bot.Token)

	if err != nil {
		logger.Fatal("Cannot user token", zap.Error(err))
	}

	r := mux.NewRouter()

	r.HandleFunc("/notify/telegram/{chatId}",
		func(w http.ResponseWriter, r *http.Request) {
			defer r.Body.Close()

			vars := mux.Vars(r)
			w.WriteHeader(http.StatusOK)
			chatID, err := strconv.ParseInt(vars["chatID"], 10, 64)

			if err != nil {
				logger.Error("converting chatID from url", zap.Error(err))
				return
			}

			bodyBytes, err := io.ReadAll(r.Body)
			if err != nil {
				logger.Error("reading request body", zap.Error(err))
			}
			bodyString := string(bodyBytes)

			if err := telegramBotApi.SendMessage(bot, chatID, bodyString); err != nil {
				logger.Error("sending telegram message", zap.Error(err))
				return
			}

			if _, err := fmt.Fprintf(w, "chatID: %v\n", vars["chatID"]); err != nil {
				logger.Error("error writing http answer", zap.Error(err))
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
