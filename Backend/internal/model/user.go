package model

import (
	"fmt"
	"net/mail"

	"golang.org/x/crypto/bcrypt"
)

// User ...
type User struct {
	ID int
	Email string
	Password string
	EncryptedPassword string
	PhoneNumber string
	TelegramID string
	Name string
	Surname string
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


func encryptString(s string) (string, error) {
	b, err := bcrypt.GenerateFromPassword([]byte(s), bcrypt.MinCost)
	if err != nil {
		return "", err
	}

	return string(b), nil
}
