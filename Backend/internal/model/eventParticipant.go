package model

import "time"

// EventParticipant ... omitempty
type EventParticipant struct {
	ID                     int       `json:"eventParticipantID"`
	EventID                int       `json:"eventID"`
	UserID                 int       `json:"userID"`
	IsGoing                bool      `json:"isGoing"`
	IsOwner                bool      `json:"isOwner"`
	NotificationTime       time.Time `json:"notificationTime"`
	NotificationInTelegram bool      `json:"notificationInTelegram"`
	NotificationInEmail    bool      `json:"notificationInEmail"`
	NotificationInSms      bool      `json:"notificationInSMS"`
}
