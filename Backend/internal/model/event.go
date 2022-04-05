package model

import "time"

// Event ...
type Event struct {
	ID int
	BeginTime time.Time
	EndTime time.Time
	Description string
	MeetingLink string
	IsRepeating bool
	Title string
}
