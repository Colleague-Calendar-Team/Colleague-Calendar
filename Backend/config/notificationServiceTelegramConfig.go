package config

import "github.com/spf13/viper"

type BotConfig struct {
	Bot struct {
		Token     string `mapstructure:"token"`
		BotAPIURL string `mapstructure:"botApiUrl"`
		Debug     string `mapstructure:"debug"`
	} `yaml:"bot"`
	HTTPTimeout int `mapstructure:"httpTimeout"`
}

func ParseBotConfig() (BotConfig, error) {
	cfg := BotConfig{}

	if err := viper.Unmarshal(&cfg); err != nil {
		return BotConfig{}, err
	}

	return cfg, nil
}
