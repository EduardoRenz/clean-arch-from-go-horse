CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

/** 
Creates a table representing a users wallet, that contains the currency type and the amount in his currency
the currency is a column of type ENUM with BRL and BTC
**/
CREATE TYPE wallet_currency_type AS ENUM ('BRL', 'BTC');
CREATE TABLE wallet (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  currency wallet_currency_type NOT NULL,
  amount NUMERIC(10, 8) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/**
Create a table transaction with timestamps and the amount of the transaction, and the currency of the transaction
**/
CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  original_currency wallet_currency_type NOT NULL,
  original_amount NUMERIC(10, 8) NOT NULL,
  currency  wallet_currency_type NOT NULL,
  amount NUMERIC(10, 8) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


/**
Default inserts
**/
INSERT INTO users (id, "name") VALUES(1, 'Eduardo');

