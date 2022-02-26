package main

import (
	"flag"
	"fmt"
	"go.uber.org/zap"
	"log"

	"Backend/config"
	"Backend/internal/logging"
)

func main() {
	// можно добавлять сколько угодно флагов, второе значение в функции -
	// значение флага по-умолчанию

	configDir := flag.String("config_dir", ".", "directory for configuration file")
	// здесь можно указать значение флага -log_level=debug и
	// logger.Debug() будет выводиться
	logLevel := flag.String("log_level", "info", "log level")
	flag.Parse()

	logger := logging.LoggerSetup(*logLevel)
	// функция после defer выполняется по достижению ближайшего return
	defer func() {
		// все ошибки выводятся через логгер и в случае критической ошибки
		// logger.Sync() в любом случае выполнится и выведет все записи из буфера
		if err := logger.Sync(); err != nil {
			log.Fatalf("logger.Sync: %v", err)
		}
	}()

	if err := config.InitViper(*configDir); err != nil {
		// Fatal означает вывод ошибки и выход из программы
		// (помним про defer ранее)
		logger.Fatal("Cannot initiate viper", zap.Error(err))
	}

	if err := config.InitViper(*configDir); err != nil {
		// вместо Fatal можно использовать Error для ошибок
		// которые не являются поводом для остановки программы
		logger.Fatal("Cannot initiate viper", zap.Error(err))
	}

	logger.Info("Viper initiated")

	configData, err := config.ParseBotConfig()

	if err != nil {
		logger.Fatal("Cannot Unmarshal config file", zap.Error(err))
	}

	fmt.Printf(configData.Bot.BotAPIURL)
}
