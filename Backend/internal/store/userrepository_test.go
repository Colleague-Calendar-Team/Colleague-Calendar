package store_test

import(
	"Backend/internal/store"
	"Backend/internal/model"

	"testing"
)

const (
	success = "\u2713"
	failed = "\u2717"
)

// TestUserRepository_Create ...
func TestUserRepository_Create(t *testing.T) {
	s, teardown := store.TestStore(t, databaseURL)
	defer teardown("users")

	t.Log("Given the need to test UserRepository_Create")
	{
		testID := 0
		t.Logf("\tTest %d: \tWhen use Create.", testID)
		{
			u, err := s.User().Create(&model.User{
				Email: "user@example.ru",
			})

			if err != nil {
				t.Fatalf("\t%s\tShould be able to create user : %T.", failed, err)
			}
			if u == nil {
				t.Fatalf("\t%s\tShould be able to create user : User is nil.", failed)
			}
                        t.Logf("\t%s\tShould be able to create user", success)
		}
	}
}


func TestUserRepository_FindByEmail(t *testing.T) {
	s, teardown := store.TestStore(t, databaseURL)
	defer teardown("users")

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
			email := "user@example.ru"
			s.User().Create(&model.User{
				Email: email,
			})

			_, err := s.User().FindByEmail(email)

			if err != nil {
				t.Fatalf("\t%s\tShould be able to find user : %T.", failed, err)
			}
                        t.Logf("\t%s\tShould be able to find user", success)
		}
	}
}
