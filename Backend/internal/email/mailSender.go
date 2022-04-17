package email

import "net/smtp"

type MailSender struct {
	login        string
	pass         string
	smtpEndpoint string
	smtpHost     string
}

func NewNotificationSender(login string, pass string, smtpEndpoint string, smtpHost string) MailSender {
	return MailSender{
		login:        login,
		pass:         pass,
		smtpEndpoint: smtpEndpoint,
		smtpHost:     smtpHost,
	}
}

func (sender *MailSender) SendMail(to string, body string, subject string) error {
	msg := "From: " + sender.login + "\n" +
		"To: " + to + "\n" +
		"Subject:" + subject + "\n\n" +
		body

	return smtp.SendMail(sender.smtpEndpoint,
		smtp.PlainAuth("", sender.login, sender.pass, sender.smtpHost),
		sender.login, []string{to}, []byte(msg))
}
