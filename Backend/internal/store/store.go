package store

import (
	"Backend/config"
	"database/sql"
	"fmt"

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
func (s *Store) Open() error { // TODO: format input from config.yml
	//dburl := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s", s.config.DatabaseURL.Host, s.config.DatabaseURL.Port, s.config.DatabaseURL.User, s.config.DatabaseURL.Password, s.config.DatabaseURL.DBname, s.config.DatabaseURL.SSLmode)
	dburl := fmt.Sprintf("host=%s dbname=%s sslmode=%s", s.config.DatabaseURL.Host, s.config.DatabaseURL.DBname, s.config.DatabaseURL.SSLmode)
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

