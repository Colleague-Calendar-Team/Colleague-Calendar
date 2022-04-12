package teststore_test

import (
	"Backend/internal/model"
	"Backend/internal/store/teststore"

	"testing"
)

const (
	success = "\u2713"
	failed  = "\u2717"
)

// TestUserRepository_Create ...
func TestUserRepository_Create(t *testing.T) {

	s := teststore.New()
	t.Log("Given the need to test UserRepository_Create")
	{
		testID := 0
		t.Logf("\tTest %d: \tWhen use Create.", testID)
		{
			u := model.TestUser(t)

			if u == nil {
				t.Fatalf("\t%s\tShould be able to create user : User is nil.", failed)
			}
			if err := s.User().Create(u); err != nil {
				t.Fatalf("\t%s\tShould be able to create user : %T.", failed, err)
			}
			t.Logf("\t%s\tShould be able to create user", success)
		}
	}
}

func TestUserRepository_Find(t *testing.T) {
	s := teststore.New()

	t.Log("Given the need to test UserRepository_FindByEmail")
	{
		testID := 0
		t.Logf("\tTest %d: \tWhen use FindByEmail for existing user.", testID)
		{
			u := model.TestUser(t)
			s.User().Create(u)
			u, err := s.User().Find(u.ID)

			if err != nil {
				t.Fatalf("\t%s\tShould be able to find user : %T.", failed, err)
			}
			t.Logf("\t%s\tShould be able to find user", success)
		}

		testID++
	}
}

func TestUserRepository_FindByEmail(t *testing.T) {
	s := teststore.New()

	t.Log("Given the need to test UserRepository_FindByEmail")
	{
		testID := 0
		t.Logf("\tTest %d: \tWhen use FindByEmail for missing user.", testID)
		{
			email := "user@example.ru"
			_, err := s.User().FindByEmail(email)

			if err == nil {
				t.Fatalf("\t%s\tShould be able to get error : %T.", failed, err)
			}
			t.Logf("\t%s\tShould be able to get error", success)
		}

		testID++
		t.Logf("\tTest %d: \tWhen use FindByEmail for existing user.", testID)
		{
			u := model.TestUser(t)
			s.User().Create(u)
			u, err := s.User().FindByEmail(u.Email)

			if err != nil {
				t.Fatalf("\t%s\tShould be able to find user : %T.", failed, err)
			}
			t.Logf("\t%s\tShould be able to find user", success)
		}
	}
}
