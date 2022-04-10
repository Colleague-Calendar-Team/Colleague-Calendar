package sqlstore_test

import(
	"os"
	"testing"
	"Backend/config"
)

var (
	databaseURL config.StoreConfig
)

func TestMain(m *testing.M) {
	databaseURL.DatabaseURL.Host = "localhost"
	databaseURL.DatabaseURL.DBname = "restapi_test"
	databaseURL.DatabaseURL.SSLmode = "disable"


	os.Exit(m.Run())
}
