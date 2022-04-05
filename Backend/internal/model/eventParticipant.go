package model

import "time"

// EventParticipant ...
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

