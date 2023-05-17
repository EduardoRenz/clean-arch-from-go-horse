import express from 'express'
import bodyParser from 'body-parser'
import WalletController from './usecases/WalletUseCases'
import TransactionUseCases from './usecases/TransactionUseCases'
import { Currency } from './entities/common'
import TransactionPostgresRepository from './repositories/transaction/TransactionPostgresRepository'
import WalletPostgresRepository from './repositories/wallet/WalletPostgresRepository'
import UserUseCases from './usecases/UserUseCases'
import UserPostgresRepository from './repositories/user/UserPostgresRepository'
import pool from './services/dbConnection'
import purchase from './routes/purchase'

const port = 5000

const transactionRepository = new TransactionPostgresRepository(pool)
const walletRepository = new WalletPostgresRepository(pool)
const userRepository = new UserPostgresRepository(pool)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/wallet', async (_, res) => {
  const userId = 1
  const walletController = new WalletController(userId, walletRepository)
  const result = await walletController.get()
  res.status(200).json(result).send()
})

app.get('/transactions', async (_, res) => {
  // suposes to get a user id from a token
  const userId = 1
  const transactionUseCases = new TransactionUseCases(userId, transactionRepository)
  const result = await transactionUseCases.get()
  res.status(200).json(result).send()
})

app.put('/currency_preference', async (req, res) => {
  const userId = 1
  const userUseCases = new UserUseCases(userRepository)
  const { currency } = req.body

  // IF not found
  if (!['BTC', 'BRL'].some((curency) => curency === currency))
    return res.status(400).json({ error: 'invalid currency' }).send()

  await userUseCases.setPreferredCurrency(userId, currency as Currency)
  res.status(200).json({ message: 'success' }).send()
})

app.get('/currency_preference', async (req, res) => {
  const userId = 1
  const userUseCases = new UserUseCases(userRepository)
  const result = await userUseCases.getPreferredCurrency(userId)
  res.status(200).json({ preferred_currency: result }).send()
})

app.use(purchase)
app.listen(port, () => console.log(`Running on port ${port}`))
