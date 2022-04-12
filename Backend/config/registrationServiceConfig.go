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
	Store struct {
		ConfigDir string `yaml:"configDir"`
	} `yaml:"store"`
	TokenStore struct {
		ConfigDir string `yaml:"configDir"`
	} `yaml:"tokenStore"`
}

// ParseRegistrationServiceConfig ...
func ParseRegistrationServiceConfig() (*RegistrationServiceConfig, error) {
	cfg := &RegistrationServiceConfig{}

	if err := viper.Unmarshal(cfg); err != nil {
		return &RegistrationServiceConfig{}, err
	}

	return cfg, nil
}
