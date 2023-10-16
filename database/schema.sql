-- schema.sql
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    date_created TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    amount DECIMAL(20,2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT current_timestamp,
    description TEXT
);
