package sqlstore_test

import(
	"Backend/internal/store/sqlstore"
	"Backend/internal/model"

	"testing"
)

const (
	success = "\u2713"
	failed = "\u2717"
)

// TestUserRepository_Create ...
func TestUserRepository_Create(t *testing.T) {
	db, teardown := sqlstore.TestDB(t, databaseURL)
	defer teardown("users")

	s := sqlstore.New(db)

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


func TestUserRepository_FindByEmail(t *testing.T) {
	db, teardown := sqlstore.TestDB(t, databaseURL)
	defer teardown("users")

	s := sqlstore.New(db)

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
			u := model.TestUser(t)
			u.Email = email
			s.User().Create(u)
			u, err := s.User().FindByEmail(email)

			if err != nil {
				t.Fatalf("\t%s\tShould be able to find user : %T.", failed, err)
			}
                        t.Logf("\t%s\tShould be able to find user", success)
		}
	}
}
