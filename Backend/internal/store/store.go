package store

import (
	"Backend/config"
	"database/sql"
	"fmt"
	"regexp"

	_ "github.com/lib/pq" // ...
)

// Store ...
type Store struct {
	config *config.StoreConfig
	db *sql.DB
	userRepository *UserRepository
}

// New ...
func New(config *config.StoreConfig) *Store {
	return &Store{
		config: config,
	}
}

// Open ...
func (s *Store) Open() error {
	dburl := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", s.config.DatabaseURL.Host, s.config.DatabaseURL.Port, s.config.DatabaseURL.User, s.config.DatabaseURL.Password, s.config.DatabaseURL.DBname, s.config.DatabaseURL.SSLmode)
	re := regexp.MustCompile(`[a-z]*= `)
	dburl = re.ReplaceAllString(dburl, "")
	db, err := sql.Open("postgres", dburl)
	if err != nil {
		return err
	}

	if err := db.Ping(); err != nil {
		return err
	}

	s.db = db

	return nil
}

// Close ...
func (s *Store) Close() {
	s.db.Close()
}

func (s *Store) User() *UserRepository {
	if s.userRepository != nil {
		return s.userRepository
	}

	s.userRepository = &UserRepository{
		store: s,
	}

	return s.userRepository
}

