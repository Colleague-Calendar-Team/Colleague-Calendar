package model

import "time"

// Event ...
type Event struct {
	ID          int       `json:"eventID"`
	BeginTime   time.Time `json:"beginTime"`
	EndTime     time.Time `json:"endTime"`
	Description string    `json:"description,omitempty"`
	MeetingLink string    `json:"meetingLink"`
	IsRepeating bool      `json:"isRepeating"`
	Title       string    `json:"title"`
	Owner       string    `json:"owner"`
}
