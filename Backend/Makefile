build_notificationServiceTelegram:
	go build -o build/ cmd/notificationServiceTelegram/notificationServiceTelegram.go
build_registrationService:
	go build -o build/ cmd/registrationService/registrationService.go
build_autenticationService:
	go build -o build/ cmd/authenticationService/authenticationService.go
test_registrationService:
	go test -v internal/serverApiRegistration/serverApiRegistration_internal_test.go
test_sqlstore:
	go test -v ./internal/store/sqlstore/...
test_models:
	go test -v ./internal/model/...
