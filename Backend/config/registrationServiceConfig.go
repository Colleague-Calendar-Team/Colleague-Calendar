package config

import (
	"github.com/spf13/viper"
)

// RegistrationServiceConfig ...
type RegistrationServiceConfig struct {
	HTTPServer struct {
		Endpoint     string `yaml:"endpoint"`
		WriteTimeout int    `yaml:"writeTimeout"`
		ReadTimeout  int    `yaml:"readTimeout"`
	} `yaml:"httpServer"`
	StorePath string `yaml:"storePath"`
}

// ParseRegistrationServiceConfig ...
func ParseRegistrationServiceConfig() (*RegistrationServiceConfig, error) {
	cfg := &RegistrationServiceConfig{}

	if err := viper.Unmarshal(cfg); err != nil {
		return &RegistrationServiceConfig{}, err
	}

	return cfg, nil
}
