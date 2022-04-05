package config

import (
	"github.com/spf13/viper"
)

func InitViper(configFilePath string) error {
	viper.Reset()
	viper.SetConfigName("config")       // config file name without extension
	viper.AddConfigPath(configFilePath) //
	viper.AddConfigPath(".")            // alternative path to config
	viper.AutomaticEnv()                // read value ENV variable
	err := viper.ReadInConfig()

	return err
}
