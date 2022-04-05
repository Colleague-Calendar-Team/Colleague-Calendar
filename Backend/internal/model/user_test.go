package model_test

import (
	"Backend/internal/model"
	"testing"
)


const (
	success = "\u2713"
	failed = "\u2717"
)


func TestUser_Validate(t *testing.T) {
	testCases := []struct {
		name string
		u func() *model.User
		isValid bool
	}{
		{
			name: "valid",
			u: func() *model.User {
				return model.TestUser(t)
			},
			isValid: true,
		},
		{
			name: "with encrypt password",
			u: func() *model.User {
				u := model.TestUser(t)
				u.Password = ""
				u.EncryptedPassword = "encryptedpassword"
				return u
			},
			isValid: true,
		},
		{
			name: "empty email",
			u: func() *model.User {
				u := model.TestUser(t)
				u.Email = ""
				return u
			},
			isValid: false,
		},
		{
			name: "invalid email",
			u: func() *model.User {
				u := model.TestUser(t)
				u.Email = "invalid"
				return u
			},
			isValid: false,
		},
		{
			name: "empty password",
			u: func() *model.User {
				u := model.TestUser(t)
				u.Password = ""
				return u
			},
			isValid: false,
		},
		{
			name: "short password",
			u: func() *model.User {
				u := model.TestUser(t)
				u.Password = "short"
				return u
			},
			isValid: false,
		},
	}

	testID := 0
	t.Log("Given the need to test User_Validate")
	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			t.Logf("\tTest %d: \tWhen use Validate for %s user.", testID, tc.name)
			if tc.isValid {
				if err := tc.u().Validate(); err != nil {
					t.Fatalf("\t%s\tShould NOT be able to get error: %T.", failed, err)
				}
				t.Logf("\t%s\tShould NOT be able to get error.", success)
			} else {
				if err := tc.u().Validate(); err == nil {
					t.Fatalf("\t%s\tShould be able to get error.", failed)
				}
				t.Logf("\t%s\tShould be able to get error.", success)
			}
			testID++
		})
	}
}

func TestUser_BeforeCreate(t *testing.T) {
	u := model.TestUser(t)
	t.Log("Given the need to test User_BeforeCreate")
	{
		testID := 0
		t.Logf("\tTest %d: \tWhen use BeforeCreate.", testID)
		{
			if err := u.BeforeCreate(); err != nil {
				t.Fatalf("\t%s\tShould NOT be able to get error: %T.", failed, err)
			}
                        t.Logf("\t%s\tShould NOT be able to get error.", success)
		}

		testID++
		t.Logf("\tTest %d: \tWhen use BeforeCreate.", testID)
		{
			if u.EncryptedPassword == "" {
				t.Fatalf("\t%s\tShould NOT be able to get empty EncryptedPassword.", failed)
			}
                        t.Logf("\t%s\tShould NOT be able to get empty EncryptedPassword", success)
		}
	}

}
