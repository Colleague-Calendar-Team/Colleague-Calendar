package serverApiRegistration

import (
	"Backend/internal/model"
	"Backend/internal/store"
	"Backend/internal/tokenStore"
	"context"
	"encoding/json"
	"strings"

	"errors"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
)

var (
	ErrorInvalidDataRegistration = errors.New("invalid user data provided for registration")
	ErrorReadingReqBody          = errors.New("error reading request body")
	ErrorCouldnotAnswerFromDB    = errors.New("couldn't get answer from database") // TODO: add
	ErrorInvalidLoginOrPass      = errors.New("invalid username/password supplied")
	ErrorReadingReqQuery         = errors.New("error reading request query")
	ErrorNotAuthorized           = errors.New("not authorized")
)

const (
	signingKey                 = "ddgjhkbfhsdbfjhbfbbjbjhgbksdhbf"
	tokenTTL                   = 1 * time.Minute
	authorizationHeader        = "Authorization"
	ctxKeyUser          ctxKey = iota
)

type ctxKey int16

type tokenClaims struct {
	jwt.StandardClaims
	UserID int `json:"userID"`
}

// ServerApi ...
type ServerApiRegistration struct {
	store      store.Store
	tokenStore *tokenStore.Client
}

// New ...
func New(st store.Store, tokenSt *tokenStore.Client) *ServerApiRegistration {
	return &ServerApiRegistration{
		store:      st,
		tokenStore: tokenSt,
	}
}

// HandleWhoami ...
func (s *ServerApiRegistration) HandleWhoami() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		u, _ := s.store.User().Find(r.Context().Value(ctxKeyUser).(int))
		s.respond(w, r, http.StatusOK, u.Email)
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

		if err := s.store.User().Create(u); err != nil {
			s.error(w, r, http.StatusBadRequest, ErrorInvalidDataRegistration)
			return
		}

		s.respond(w, r, http.StatusOK, nil)
	}
}

// AuthenticateUser ...
func (s *ServerApiRegistration) AuthenticateUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		header := r.Header.Get(authorizationHeader)
		if header == "" {
			s.error(w, r, http.StatusUnauthorized, ErrorNotAuthorized)
			return
		}

		headerParts := strings.Split(header, " ")
		if len(headerParts) != 2 {
			s.error(w, r, http.StatusUnauthorized, ErrorNotAuthorized)
			return
		}

		// parse token
		/*
			token, err := jwt.ParseWithClaims(headerParts[1], &tokenClaims{}, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, ErrorNotAuthorized
				}

				return []byte(signingKey), nil
			})
			if err != nil {
				s.error(w, r, http.StatusUnauthorized, ErrorNotAuthorized)
				return
			}
				claims, ok := token.Claims.(*tokenClaims)
				if !ok {
					s.error(w, r, http.StatusUnauthorized, ErrorNotAuthorized)
					return
				}
		*/
		id, err := s.tokenStore.GetToken(headerParts[1])
		if err != nil {
			s.error(w, r, http.StatusUnauthorized, ErrorNotAuthorized)
			return
		}
		next.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), ctxKeyUser, id))) // claims.UserID
	})
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

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
			jwt.StandardClaims{
				ExpiresAt: time.Now().Add(tokenTTL).Unix(),
				IssuedAt:  time.Now().Unix(),
			},
			u.ID,
		})

		validToken, err := token.SignedString([]byte(signingKey))

		s.tokenStore.SetToken(validToken, u.ID)

		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err) // error generate token
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
