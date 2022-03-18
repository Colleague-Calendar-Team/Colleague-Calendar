CREATE TABLE events (
	id bigserial not null primary key,
	begin_time timestamp,
	end_time timestamp,
	description varchar,
	meeting_link varchar,
	is_repeating boolean,
	title varchar
);
