CREATE TYPE wallet_currency_type AS ENUM ('BRL', 'BTC');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  preferred_currency wallet_currency_type NOT NULL default 'BRL'
);

/** 
Creates a table representing a users wallet, that contains the currency type and the amount in his currency
the currency is a column of type ENUM with BRL and BTC
**/
CREATE TABLE wallet (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  currency wallet_currency_type NOT NULL,
  amount NUMERIC(16, 8) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/**
Create a table transaction with timestamps and the amount of the transaction, and the currency of the transaction
**/
CREATE TYPE transaction_type AS ENUM ('DEPOSIT', 'WITHDRAW','DEBIT');
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  type transaction_type NOT NULL,
  original_currency wallet_currency_type NOT NULL,
  original_amount NUMERIC(16, 8) NOT NULL,
  currency  wallet_currency_type NOT NULL,
  amount NUMERIC(16, 8) NOT NULL,
  created_at TIMESTAMP NOT null default now(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);


/**
Default inserts
**/
INSERT INTO users (id, "name") VALUES(1, 'Eduardo');

/**
Insertt a default wallet balance
**/
INSERT INTO wallet (id, user_id, currency, amount) VALUES(1, 1, 'BRL', 100);
INSERT INTO wallet (user_id, currency, amount) VALUES( 1, 'BTC', 0.00010000);

/**
Insert a default transaction
**/
INSERT INTO transactions (id, user_id, type, original_currency, original_amount, currency, amount) VALUES(1, 1, 'DEPOSIT', 'BRL', 100, 'BRL', 100);

INSERT INTO transactions (id, user_id, type, original_currency, original_amount, currency, amount) VALUES(2, 1, 'DEPOSIT', 'BTC', 0.00010000, 'BTC', 0.00010000);