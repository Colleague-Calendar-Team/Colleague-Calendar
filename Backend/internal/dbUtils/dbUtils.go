package dbUtils

import (
	"Backend/config"
	"database/sql"
	"fmt"
	"regexp"
)

// NewDB ...
func NewDB(configStore config.Storage) (*sql.DB, error) {
	dburl := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", configStore.Host, configStore.Port, configStore.User, configStore.Password, configStore.DBname, configStore.SSLmode)
	re := regexp.MustCompile(`[a-z]*= `)
	dburl = re.ReplaceAllString(dburl, "")

	db, err := sql.Open("postgres", dburl)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
