package logging

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func LoggerSetup(logLevel string) *zap.Logger {
	logLevels := map[string]zapcore.Level{
		"debug": zap.DebugLevel,
		"info":  zap.InfoLevel,
		"warn":  zap.WarnLevel,
		"error": zap.ErrorLevel,
	}

	var loggerConfig zap.Config

	if os.Getenv("DEBUG_LOG") == "" {
		loggerConfig = zap.NewProductionConfig()
	} else {
		loggerConfig = zap.NewDevelopmentConfig()
	}

	loggerConfig.EncoderConfig.TimeKey = "@timestamp"
	loggerConfig.EncoderConfig.EncodeTime = zapcore.RFC3339TimeEncoder
	loggerConfig.Level.SetLevel(logLevels[logLevel])

	logger, err := loggerConfig.Build()

	if err != nil {
		logger.Fatal(err.Error())
	}

	return logger
}
