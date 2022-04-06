/*create orders table*/
CREATE TABLE orders (id serial PRIMARY KEY, status VARCHAR(64) DEFAULT 'Active', user_id BIGINT REFERENCES users(id));