package config

import (
	"github.com/spf13/viper"
)

// StoreConfig ...
type StoreConfig struct {
	DatabaseURL struct {
		Host string `yaml:"host"`
		Port string `yaml:"port"`
		User string `yaml:"user"`
		Password string `yaml:"password"`
		DBname string `yaml:"dbname"`
		SSLmode string `yaml:"sslmode"`
	} `yaml:"databaseURL"`
}

func ParseStoreConfig() (*StoreConfig, error) {
	cfg := &StoreConfig{}

	if err := viper.Unmarshal(cfg); err != nil {
		return &StoreConfig{}, err
	}

	return cfg, nil
}
