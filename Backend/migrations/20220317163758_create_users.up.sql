CREATE TABLE users (
	id bigserial not null primary key,
	email varchar not null unique,
	encrypted_password varchar not null,
	phone_number varchar,
	telegram_id varchar,
	name varchar,
	surname varchar
);
