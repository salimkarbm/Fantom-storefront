/* create users table */
CREATE TABLE users (id serial PRIMARY KEY, firstname varchar(100) NOT NULL, lastname varchar(100) NOT NULL, password_digest varchar(150) NOT NUll, email varchar(100) NOT NULL UNIQUE , roles VARCHAR(50) DEFAULT 'user');
