# A Go Horse to Clean Arch project

The goal of this project is to create a example of go horse api then improve until a Clean Architecture

## Project Overview

The main functionality of the project is to simulate a transaction in a currency and then convert it into another if needed. To achieve this, the project will use Free apis to get the current price.

- User can choose a preferred currency to use in your balance
- User can get the list of transactions and wallte information (current balance)
- Every transaction will be stored in a table
- Every transaction reduce the amount in wallet

## Free Cripto API's to get Currency Price

- https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD
- https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT

## Endpoints List

`GET /wallet` -> Get User Balance

`GET /transactions` -> Get User Transactions

`GET /currency_preference` -> Get User Currency Preference

`PUT /currency_preference` -> Update User Currency Preference passing json currency

`POST /purchase` -> Creates a new Transaction with a purchase, passing amount and currency

---

## Running the Project

Install all dependencies:

```
yarn install
```

Run in dev mode:

```
npm run start:dev
```

Running tests:

```
npm run test
```

## Branches

- <b>base</b> : Project base to start coding
- <b> gohorse </b> Complete project with code smell, not using good pratices
- <b> Clean </b> A Clean Architecture refactor
