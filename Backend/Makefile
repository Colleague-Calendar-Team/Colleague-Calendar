build_notificationServiceTelegram:
	go build -o build/ cmd/notificationServiceTelegram/notificationServiceTelegram.go
build_registrationService:
	go build -o build/ cmd/registrationService/registrationService.go
test_registrationService:
	go test -v internal/serverApiRegistration/serverApiRegistration_internal_test.go
test_store:
	go test -v ./internal/store/...
test_models:
	go test -v ./internal/model/...
