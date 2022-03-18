package model

import "time"

// User ...
type User struct {
	ID int
	Email string
	EncryptedPassword string
	PhoneNumber string
	TelegramID string
	Name string
	Surname string
	// TODO: avatar
}

type Event struct {
	ID int
	BeginTime time.Time
	EndTime time.Time
	Description string
	MeetingLink string
	IsRepeating bool
	Title string
}

type EventParticipant struct {
	ID int
	EventID int
	UserID int
	IsGoing bool
	NotificationTime time.Time
	NotificationInTelegram bool
	NotificationInSms bool
	NotificationInEmail bool
	IsOwner bool
}

