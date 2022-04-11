package serverApiRegistration

import (
	"Backend/internal/store/teststore"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
)

const (
	success = "\u2713"
	failed  = "\u2717"
)

func TestAPIServerReg_HandleRegisterUser(t *testing.T) {
	s := New(teststore.New())
	r := mux.NewRouter()
	configureRouter_test(r, s)
	testCases := []struct {
		name         string
		payload      interface{}
		expectedCode int
	}{
		{
			name: "valid",
			payload: map[string]string{
				"email":          "user@example.org",
				"password":       "password",
				"passwordRepeat": "password",
			},
			expectedCode: http.StatusOK,
		},
	}

	testID := 0
	t.Log("Given the need to test HandleRegisterUser")
	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			rec := httptest.NewRecorder()
			b := &bytes.Buffer{}
			json.NewEncoder(b).Encode(tc.payload)
			req, _ := http.NewRequest(http.MethodPost, "/auth/register", b)
			r.ServeHTTP(rec, req)
			t.Logf("\tTest %d: \tWhen use HandleRegisterUser for %s user.", testID, tc.name)
			if tc.expectedCode != rec.Code {
				t.Fatalf("\t%s\tShould be able to get equal status:\n Expected: %d, Received: %d.", failed, tc.expectedCode, rec.Code)
			}
			t.Logf("\t%s\tShould be able to get equal status.", success)
			testID++
		})
	}
}

func configureRouter_test(r *mux.Router, s *ServerApiRegistration) {
	auth := r.PathPrefix("/auth").Subrouter()
	//auth.Use()
	auth.HandleFunc("/register", s.HandleRegisterUser()).Methods("POST")
}
