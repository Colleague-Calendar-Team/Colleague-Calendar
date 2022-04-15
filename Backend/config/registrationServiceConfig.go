package config

import (
	"github.com/spf13/viper"
)

type Memcached struct {
	Endpoint     string `mapstructure:"endpoint"`
	WriteTimeout int    `mapstructure:"writeTimeout"`
	ReadTimeout  int    `mapstructure:"readTimeout"`
}

type Storage struct {
	Host     string `mapstructure:"host"`
	Port     string `mapstructure:"port"`
	User     string `mapstructure:"user"`
	Password string `mapstructure:"password"`
	DBname   string `mapstructure:"dbname"`
	SSLmode  string `mapstructure:"sslmode"`
}

// RegistrationServiceConfig ...
type RegistrationServiceConfig struct {
	HTTPServer struct {
		Endpoint     string `mapstructure:"endpoint"`
		WriteTimeout int    `mapstructure:"writeTimeout"`
		ReadTimeout  int    `mapstructure:"readTimeout"`
	} `mapstructure:"httpServer"`
	Storage   Storage   `mapstructure:"storage"`
	Memcached Memcached `mapstructure:"memcached"`
}

// ParseRegistrationServiceConfig ...
func ParseRegistrationServiceConfig() (*RegistrationServiceConfig, error) {
	cfg := &RegistrationServiceConfig{}

	if err := viper.Unmarshal(cfg); err != nil {
		return &RegistrationServiceConfig{}, err
	}

	return cfg, nil
}
