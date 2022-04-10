package sqlstore

import(
	"Backend/config"
	"database/sql"

	"fmt"
	"regexp"
	"strings"
	"testing"
)

// TestDB ...
func TestDB(t *testing.T, databaseURL config.StoreConfig) (*sql.DB, func(...string)) {
	t.Helper()
	dburl := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", databaseURL.DatabaseURL.Host, databaseURL.DatabaseURL.Port, databaseURL.DatabaseURL.User, databaseURL.DatabaseURL.Password, databaseURL.DatabaseURL.DBname, databaseURL.DatabaseURL.SSLmode)
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
