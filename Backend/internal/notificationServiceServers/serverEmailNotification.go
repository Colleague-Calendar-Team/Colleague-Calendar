package notificationServiceServers

import (
	"encoding/json"
	"errors"
	"net/http"

	"Backend/internal/email"
	"Backend/internal/model"
)

var errorReadingReqBody = errors.New("error reading event body")

var errorEmailService = errors.New("couldn't get answer from email service")

type ServerEmailNotification struct {
	emailSender email.MailSender
}

func NewServerEmailNotifications(emailSender email.MailSender) ServerEmailNotification {
	return ServerEmailNotification{emailSender: emailSender}
}

func (notificationServer *ServerEmailNotification) SendNotification(w http.ResponseWriter, r *http.Request) {
	event := &model.Event{}
	if err := json.NewDecoder(r.Body).Decode(event); err != nil {
		notificationServer.error(w, r, http.StatusInternalServerError, errorReadingReqBody)
		return
	}

	if err := notificationServer.sendEmailEventNotification(event); err != nil {
		notificationServer.error(w, r, http.StatusServiceUnavailable, errorEmailService)
		return
	}

	notificationServer.respond(w, r, http.StatusOK, "notification sent successfully")
}

func (notificationServer *ServerEmailNotification) error(w http.ResponseWriter, r *http.Request, code int, err error) {
	notificationServer.respond(w, r, code, map[string]string{"error": err.Error()})
}

func (notificationServer *ServerEmailNotification) respond(w http.ResponseWriter, r *http.Request, code int, data interface{}) {
	w.WriteHeader(code)
	if data != nil {
		json.NewEncoder(w).Encode(data)
	}
}

func (notificationServer *ServerEmailNotification) sendEmailEventNotification(event *model.Event) error {
	subjectString := "Сегодня событие: " + event.Title + " в " + event.BeginTime.Format("14:45")

	return notificationServer.emailSender.SendMail(event.Owner, newEmailNotificationText(event), subjectString)
}

func newEmailNotificationText(event *model.Event) string {
	// time formatting is implemented via writing time output as example
	notificationText := "Событие: " + event.Title + "\n" +
		"Начало в " + event.BeginTime.Format("14:45") + "\n" +
		"Окончание в " + event.EndTime.Format("14:45") + "\n" +
		"Ссылка на встречу: " + event.MeetingLink + "\n"

	if event.IsRepeating {
		return notificationText + "Это еженедельное событие\n" +
			"Описание: " + event.Description + "\n"
	}

	return notificationText + "Описание: " + event.Description + "\n"
}
