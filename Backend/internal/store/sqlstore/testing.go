package sqlstore

import (
	"Backend/config"
	"database/sql"

	"fmt"
	"regexp"
	"strings"
	"testing"
)

// TestDB ...
func TestDB(t *testing.T, databaseURL config.Storage) (*sql.DB, func(...string)) {
	t.Helper()
	dburl := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", databaseURL.Host, databaseURL.Port, databaseURL.User, databaseURL.Password, databaseURL.DBname, databaseURL.SSLmode)
	re := regexp.MustCompile(`[a-z]*= `)
	dburl = re.ReplaceAllString(dburl, "")
	db, err := sql.Open("postgres", dburl)
	if err != nil {
		t.Fatal(err)
	}

	if err := db.Ping(); err != nil {
		t.Fatal(err)
	}

	return db, func(tables ...string) {
		if len(tables) > 0 {
			if _, err := db.Exec(fmt.Sprintf("TRUNCATE %s CASCADE", strings.Join(tables, ", "))); err != nil {
				t.Fatal(err)
			}
		}
		db.Close()
	}
}
