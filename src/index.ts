import express from 'express'
import bodyParser from 'body-parser'
import { Pool } from 'pg'
import axios from 'axios'
import WalletController from './usecases/WalletController'
import { dbConnection } from './defines'
import TransactionController from './usecases/TransactionController'
import UserUseCases from './usecases/UserUseCases'
import UserPostgresRepository from './repositories/UserPostgresRepository'
import { Currencies } from './entities/common'

const port = 5000
const pool = new Pool({ ...dbConnection })
pool.connect()

const userRepository = new UserPostgresRepository(pool)
const userControler = new UserUseCases(userRepository)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/wallet', async (_, res) => {
  const userId = 1
  const walletController = new WalletController(userId)
  const result = await walletController.get()
  res.status(200).json(result).send()
})

app.get('/transactions', async (_, res) => {
  // suposes to get a user id from a token
  const userId = 1
  const transactionController = new TransactionController(userId)
  const result = await transactionController.get()
  res.status(200).json(result).send()
})

app.put('/currency_preference', async (req, res) => {
  const userId = 1
  const { currency } = req.body

  // IF not found
  if (!['BTC', 'BRL'].some((curency) => curency === currency))
    return res.status(400).json({ error: 'invalid currency' }).send()

  await pool.query('UPDATE users SET preferred_currency = $1 WHERE id = $2', [currency, userId])
  res.status(200).json({ message: 'success' }).send()
})

app.get('/currency_preference', async (req, res) => {
  const userId = 1
  const result = await pool.query('SELECT preferred_currency FROM users WHERE id = $1', [userId])
  res.status(200).json(result.rows[0]).send()
})

app.post('/purchase', async (req, res) => {
  try {
    // suposes to get a user id from a token
    const userId = 1
    // Get user prefered currency
    const prefered_currency = await userControler.getPreferredCurrency(userId)
    // Get the data from the request
    const { amount: original_amount, currency: original_currency } = req.body
    // Check if have correct values
    if (!original_amount || !original_currency) return res.status(400).send()
    // Check if currency is valid
    if (!Object.values(Currencies).some((curency) => curency === original_currency))
      return res.status(400).json({ error: 'invalid currency' }).send()

    const current_quotation = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${original_currency}&tsyms=${prefered_currency}`
    )

    const amount = original_amount * current_quotation.data[prefered_currency]
    const walletController = new WalletController(userId)
    const currencyBalance = await walletController.getByCurrency(prefered_currency)

    if (currencyBalance.amount < amount) return res.status(400).json({ error: 'insufficient balance' }).send()

    await pool.query('BEGIN')

    const new_transaction = await pool.query(
      `
    INSERT INTO transactions (original_currency, original_amount, currency, amount, type, user_id) VALUES 
    ($1, $2, $3, $4, $5, $6) RETURNING id;`,
      [original_currency, original_amount, prefered_currency, amount, 'DEBIT', userId]
    )

    // reduce user balance in wallet
    await pool.query('UPDATE wallet SET amount = amount - $1 WHERE user_id = $2 and currency = $3', [
      amount,
      userId,
      prefered_currency
    ])

    await pool.query('COMMIT')

    res.status(200).json({ message: 'success', id: new_transaction.rows[0].id }).send()
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      res.status(401).json({ error: error.message }).send()
    }

    await pool.query('ROLLBACK')
  } finally {
    await pool.query('END')
  }
})

app.listen(port, () => console.log(`Running on port ${port}`))
