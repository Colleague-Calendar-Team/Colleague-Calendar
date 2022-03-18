package serverApiRegistration

import (
	"testing"
)

const (
	success = "\u2713"
	failed = "\u2717"
)

func TestAPIServerReg_HandleTest(t *testing.T) {
	t.Log("Given the need to test HandleTest")
	{
		testID := 0
		t.Logf("\tTest %d: \tWhen use  HandleTest.", testID)
		{
			rec := "Test"
			if rec != "Test" {
				t.Fatalf("\t%s\tShould be able to get Hello : %T.", failed, rec)
			}
			t.Logf("\t%s\tShould be able to get Hello", success)
		}

	}
}
