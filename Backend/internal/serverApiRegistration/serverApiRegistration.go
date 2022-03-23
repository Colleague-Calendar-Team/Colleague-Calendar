package serverApiRegistration

import (
	"Backend/internal/store"

	"io"
	"net/http"
)

// ServerApi ...
type ServerApiRegistration struct {
	store *store.Store
}

// New ...
func New(st *store.Store) *ServerApiRegistration {
	return &ServerApiRegistration{
		store: st,
	}
}

// HandleTest ...
func (s *ServerApiRegistration) HandleTest() http.HandlerFunc {
	// ...
	return func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()
		io.WriteString(w, "Test")
	}
}
