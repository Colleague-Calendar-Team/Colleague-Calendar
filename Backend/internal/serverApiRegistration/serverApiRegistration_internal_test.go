package serverApiRegistration

import (
	"Backend/internal/store/teststore"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
)

const (
	success = "\u2713"
	failed  = "\u2717"
)

func TestAPIServerReg_HandleTest(t *testing.T) {
	t.Log("Given the need to test HandleTest")
	{
		testID := 0
		t.Logf("\tTest %d: \tWhen use  HandleTest.", testID)
		{
			rec := httptest.NewRecorder()
			req, _ := http.NewRequest(http.MethodPost, "/users", nil)
			s := New(teststore.New())
			r := mux.NewRouter()
			configureRouter_test(r, s)

			r.ServeHTTP(rec, req)
			if rec.Code != http.StatusOK {
				t.Fatalf("\t%s\tShould be able to get Hello : %T.", failed, rec)
			}
			t.Logf("\t%s\tShould be able to get Hello", success)
		}

	}
}

func configureRouter_test(r *mux.Router, s *ServerApiRegistration) {
	r.HandleFunc("/test", s.HandleTest())
	r.HandleFunc("/users", s.HandleUsersCreate()).Methods("POST")
}
