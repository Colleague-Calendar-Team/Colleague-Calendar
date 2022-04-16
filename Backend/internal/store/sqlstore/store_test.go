package sqlstore_test

import (
	"Backend/config"
	"os"
	"testing"
)

var (
	databaseURL config.Storage
)

func TestMain(m *testing.M) {
	databaseURL.Host = "localhost"
	databaseURL.DBname = "restapi_test"
	databaseURL.SSLmode = "disable"

	os.Exit(m.Run())
}
