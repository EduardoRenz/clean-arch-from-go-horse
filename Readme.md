# A Go Horse to Clean Arch project

The goal of this project is to create a example of go horse api then improve until a Clean Architecture

## Project Overview

The main functionality of the project is to simulate a transaction in a Currency and then convert it into Another if needed. To achieve this, the project will use Free apis to get the current price.

## Free Cripto API's to get Currency Price

- https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD
- https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT

## Endpoints List

`GET /wallet` -> Get User Balance

`GET /transactions` -> Get User Transactions

`POST /transaction` -> Creates a new Transaction

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
