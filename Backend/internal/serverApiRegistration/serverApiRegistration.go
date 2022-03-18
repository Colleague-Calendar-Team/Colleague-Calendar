package serverApiRegistration

import (
	"Backend/config"
	"Backend/internal/store"
	"time"

	"io"
	"net/http"

	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

// ServerApi ...
type ServerApiRegistration struct {
	config *config.RegistrationServiceConfig
	logger *zap.Logger // TODO: fuck this shit
	router *mux.Router
	store *store.Store
}

// New ...
func New(config *config.RegistrationServiceConfig, logger *zap.Logger) *ServerApiRegistration {
	return &ServerApiRegistration{
		config: config,
		logger: logger,
		router: mux.NewRouter(),
	}
}

// Start ...
func (s *ServerApiRegistration) Start() error {
	s.configureRouter()

	if err := s.configureStore(); err != nil {
		return err
	}

	http.Handle("/", s.router)

	srv := &http.Server{
		Handler: s.router,
		Addr: s.config.HTTPServer.Endpoint,
		WriteTimeout: time.Duration(s.config.HTTPServer.WriteTimeout * int(time.Second)),
		ReadTimeout: time.Duration(s.config.HTTPServer.ReadTimeout * int(time.Second)),
	}

	s.logger.Fatal("http listen and serve: ", zap.Error(srv.ListenAndServe()))
	return nil
}

// configureRouter ...
func (s *ServerApiRegistration) configureRouter() {
	s.router.HandleFunc("/test", s.HandleTest())
}

// configureStore
func (s *ServerApiRegistration) configureStore() error {
	if err := config.InitViper(s.config.StorePath); err != nil {
		s.logger.Fatal("Cannot initiate viper", zap.Error(err))
	}

	s.logger.Info("Viper initiated")

	configDataStore, err := config.ParseStoreConfig()

	if err != nil {
		s.logger.Fatal("Cannot Unmarshal config file", zap.Error(err))
	}

	//st := store.New(&config.StoreConfig{DatabaseURL: "host=localhost dbname=restapi_dev sslmode=disable",}) // config.ParseStoreConfig()
	st := store.New(configDataStore)
	if err := st.Open(); err != nil {
		return err
	}

	s.store = st

	return nil
}

func (s *ServerApiRegistration) HandleTest() http.HandlerFunc {
	// ...
	return func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()
		io.WriteString(w, "Test")
	}
}
