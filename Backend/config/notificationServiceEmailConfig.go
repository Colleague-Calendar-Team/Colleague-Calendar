package config

import "github.com/spf13/viper"

type notificationServiceEmailConfig struct {
	Email struct {
		Login              string `yaml:"login"`
		Pass               string `yaml:"pass"`
		SMTPServerEndpoint string `yaml:"smtpServerEndpoint"`
		SMTPServerHost     string `yaml:"smtpServerHost"`
	} `yaml:"email"`
	HTTPServer struct {
		Endpoint     string `yaml:"endpoint"`
		WriteTimeout int    `yaml:"writeTimeout"`
		ReadTimeout  int    `yaml:"readTimeout"`
	} `yaml:"httpServer"`
	APIKey string `yaml:"apiKey"`
}

func ParseNotificationServiceEmailConfig() (notificationServiceEmailConfig, error) {
	cfg := notificationServiceEmailConfig{}

	if err := viper.Unmarshal(&cfg); err != nil {
		return notificationServiceEmailConfig{}, err
	}

	return cfg, nil
}
