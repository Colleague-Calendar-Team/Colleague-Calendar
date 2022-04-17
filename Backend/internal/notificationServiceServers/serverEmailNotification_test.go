package notificationServiceServers

import (
	"Backend/internal/email"
	"Backend/internal/model"
	"net/http"
	"testing"
)

func TestServerEmailNotification_SendNotification(t *testing.T) {
	type fields struct {
		emailSender email.MailSender
	}
	type args struct {
		w http.ResponseWriter
		r *http.Request
	}
	tests := []struct {
		name   string
		fields fields
		args   args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			notificationServer := &ServerEmailNotification{
				emailSender: tt.fields.emailSender,
			}
			notificationServer.SendNotification(tt.args.w, tt.args.r)
		})
	}
}

func TestServerEmailNotification_error(t *testing.T) {
	type fields struct {
		emailSender email.MailSender
	}
	type args struct {
		w    http.ResponseWriter
		r    *http.Request
		code int
		err  error
	}
	tests := []struct {
		name   string
		fields fields
		args   args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			notificationServer := &ServerEmailNotification{
				emailSender: tt.fields.emailSender,
			}
			notificationServer.error(tt.args.w, tt.args.r, tt.args.code, tt.args.err)
		})
	}
}

func TestServerEmailNotification_respond(t *testing.T) {
	type fields struct {
		emailSender email.MailSender
	}
	type args struct {
		w    http.ResponseWriter
		r    *http.Request
		code int
		data interface{}
	}
	tests := []struct {
		name   string
		fields fields
		args   args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			notificationServer := &ServerEmailNotification{
				emailSender: tt.fields.emailSender,
			}
			notificationServer.respond(tt.args.w, tt.args.r, tt.args.code, tt.args.data)
		})
	}
}

func TestServerEmailNotification_sendEmailEventNotification(t *testing.T) {
	type fields struct {
		emailSender email.MailSender
	}
	type args struct {
		event *model.Event
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			notificationServer := &ServerEmailNotification{
				emailSender: tt.fields.emailSender,
			}
			if err := notificationServer.sendEmailEventNotification(tt.args.event); (err != nil) != tt.wantErr {
				t.Errorf("sendEmailEventNotification() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func Test_newEmailNotificationText(t *testing.T) {
	type args struct {
		event *model.Event
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := newEmailNotificationText(tt.args.event); got != tt.want {
				t.Errorf("newEmailNotificationText() = %v, want %v", got, tt.want)
			}
		})
	}
}
