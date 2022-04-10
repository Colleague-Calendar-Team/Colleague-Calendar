package teststore

import (
	"Backend/internal/model"
	"Backend/internal/store"
)

// Store ...
type Store struct {
	userRepository *UserRepository
}

// New ...
func New() *Store {
	return &Store{}
}
/*
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
*/
func (s *Store) User() store.UserRepository {
	if s.userRepository != nil {
		return s.userRepository
	}

	s.userRepository = &UserRepository{
		store: s,
		users: make(map[string]*model.User),
	}

	return s.userRepository
}

