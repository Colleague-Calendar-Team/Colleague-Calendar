CREATE TABLE event_participant (
	id bigserial not null primary key,
	event_id bigint not null references events (ID),
	user_id bigint not null references users (ID),
	is_going boolean not null,
	notification_time timestamp,
	notification_in_telegram boolean,
	notification_in_sms boolean,
	notification_in_email boolean,
	is_owner boolean not null
);
