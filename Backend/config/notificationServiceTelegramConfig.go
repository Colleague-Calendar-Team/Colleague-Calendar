package config

import (
	"github.com/spf13/viper"
)

type BotConfig struct {
	Bot struct {
		Token     string `yaml:"token"`
		BotAPIURL string `yaml:"botApiUrl"`
		Debug     string `yaml:"debug"`
	} `yaml:"bot"`
	HTTPServer struct {
		Endpoint     string `yaml:"endpoint"`
		WriteTimeout int    `yaml:"writeTimeout"`
		ReadTimeout  int    `yaml:"readTimeout"`
	} `yaml:"httpServer"`
}

func ParseBotConfig() (BotConfig, error) {
	cfg := BotConfig{}

	if err := viper.Unmarshal(&cfg); err != nil {
		return BotConfig{}, err
	}

	return cfg, nil
}
