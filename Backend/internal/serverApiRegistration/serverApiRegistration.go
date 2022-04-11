package serverApiRegistration

import (
	"Backend/internal/model"
	"Backend/internal/store"
	"encoding/json"

	"errors"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
)

var (
	ErrorInvalidDataRegistration = errors.New("Invalid user data provided for registration")
	ErrorReadingReqBody          = errors.New("Error reading request body")
	ErrorCouldnotAnswerFromDB    = errors.New("Couldn't get answer from database") // TODO: add
	ErrorInvalidLoginOrPass      = errors.New("Invalid username/password supplied")
	ErrorReadingReqQuery         = errors.New("Error reading request query")
)

var mySignKey = []byte("qwertyuiop")

// ServerApi ...
type ServerApiRegistration struct {
	store store.Store
}

// New ...
func New(st store.Store) *ServerApiRegistration {
	return &ServerApiRegistration{
		store: st,
	}
}

// HandleRegisterUser ...
func (s *ServerApiRegistration) HandleRegisterUser() http.HandlerFunc {
	type request struct {
		Email          string `json:"email"`
		Password       string `json:"password"`
		PasswordRepeat string `json:"passwordRepeat"`
		PhoneNumber    string `json:"phoneNumber"`
		TelegramID     string `json:"telegramID"`
		Name           string `json:"name"`
		Surname        string `json:"surname"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, r, http.StatusInternalServerError, ErrorReadingReqBody)
			return
		}

		if req.Password != req.PasswordRepeat {
			s.error(w, r, http.StatusBadRequest, ErrorInvalidDataRegistration)
			return
		}

		u := &model.User{
			Email:       req.Email,
			Password:    req.Password,
			PhoneNumber: req.PhoneNumber,
			TelegramID:  req.TelegramID,
			Name:        req.Name,
			Surname:     req.Surname,
		}

		if err := s.store.User().Create(u); err != nil { // TODO: check repeat password in equal
			s.error(w, r, http.StatusBadRequest, ErrorInvalidDataRegistration)
			return
		}

		u.Sanitize()
		s.respond(w, r, http.StatusOK, nil)
	}
}

// HandleAuthenticateUser ...
func (s *ServerApiRegistration) HandleAuthenticateUser() http.HandlerFunc {
	type request struct {
		Email    string `json:"login"`
		Password string `json:"password"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, r, http.StatusInternalServerError, ErrorReadingReqQuery)
			return
		}

		u, err := s.store.User().FindByEmail(req.Email)
		if err != nil || !u.ComparePassword(req.Password) {
			s.error(w, r, http.StatusBadRequest, ErrorInvalidLoginOrPass)
			return
		}

		validToken, err := GenerateJWT()

		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
		}

		s.respond(w, r, http.StatusOK, validToken)
	}
}

func (s *ServerApiRegistration) error(w http.ResponseWriter, r *http.Request, code int, err error) {
	s.respond(w, r, code, map[string]string{"error": err.Error()})
}

func (s *ServerApiRegistration) respond(w http.ResponseWriter, r *http.Request, code int, data interface{}) {
	w.WriteHeader(code)
	if data != nil {
		json.NewEncoder(w).Encode(data)
	}
}

func GenerateJWT() (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	return token.SignedString(mySignKey)

}
