package config

import (
	"github.com/spf13/viper"
)

// StoreConfig ...
type TokenStoreConfig struct {
	HTTPServer struct {
		Endpoint     string `yaml:"endpoint"`
		WriteTimeout int    `yaml:"writeTimeout"`
		ReadTimeout  int    `yaml:"readTimeout"`
	} `yaml:"httpServer"`
}

func ParseTokenStoreConfig() (*TokenStoreConfig, error) {
	cfg := &TokenStoreConfig{}

	if err := viper.Unmarshal(cfg); err != nil {
		return &TokenStoreConfig{}, err
	}

	return cfg, nil
}
