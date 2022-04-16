package model

import (
	"fmt"
	"net/mail"

	"golang.org/x/crypto/bcrypt"
)

// User ...
type User struct {
	ID                int    `json:"userID"`
	Email             string `json:"email"`
	Password          string `json:"password,omitempty"`
	EncryptedPassword string `json:"-"`
	PhoneNumber       string `json:"phoneNumber,omitempty"`
	TelegramID        string `json:"telegramID,omitempty"`
	Name              string `json:"name,omitempty"`
	Surname           string `json:"surname,omitempty"`
	// TODO: avatar
}

// Validate ...
func (u *User) Validate() error {
	minPassLen, maxPassLen := 6, 100
	if _, err := mail.ParseAddress(u.Email); err != nil {
		return err
	}
	if l := len(u.Password); u.EncryptedPassword == "" && (l < minPassLen || l > maxPassLen) {
		return fmt.Errorf("password length: %d will not stick to the gap (%d, %d)", l, minPassLen, maxPassLen)
	}
	return nil
}

// BeforeCreate ...
func (u *User) BeforeCreate() error {
	if len(u.Password) > 0 {
		enc, err := encryptString(u.Password)
		if err != nil {
			return err
		}

		u.EncryptedPassword = enc
	}
	return nil
}

// Sanitize ...
func (u *User) Sanitize() {
	u.Password = ""
}

// ComparePassword ...
func (u *User) ComparePassword(password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(u.EncryptedPassword), []byte(password)) == nil
}

// encryptString ...
func encryptString(s string) (string, error) {
	b, err := bcrypt.GenerateFromPassword([]byte(s), bcrypt.MinCost)
	if err != nil {
		return "", err
	}

	return string(b), nil
}
