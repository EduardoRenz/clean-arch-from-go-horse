import express from 'express'
import bodyParser from 'body-parser'
import { Pool } from 'pg'
import WalletController from './usecases/WalletUseCases'
import { dbConnection } from './defines'
import TransactionController from './usecases/TransactionController'
import { Currencies } from './entities/common'
import PurchaseController from './usecases/PurchaseController'
import TransactionPostgresRepository from './repositories/transaction/TransactionPostgresRepository'
import WalletMockRepository from './repositories/wallet/WalletMockRepository'
import WalletPostgresRepository from './repositories/wallet/WalletPostgresRepository'

const port = 5000
const pool = new Pool({ ...dbConnection })
pool.connect()

const transactionRepository = new TransactionPostgresRepository(pool)
const walletRepository = new WalletPostgresRepository(pool)

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
  const transactionController = new TransactionController(userId, transactionRepository)
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
    const { amount: original_amount, currency: original_currency } = req.body
    await pool.query('BEGIN')
    // Check if have correct values
    if (!original_amount || !original_currency) return res.status(400).send()
    // Check if currency is valid
    if (!Object.values(Currencies).some((curency) => curency === original_currency))
      return res.status(400).json({ error: 'invalid currency' }).send()

    const purchaseController = new PurchaseController(pool)
    const purchaseId = await purchaseController.purchase(userId, {
      amount: original_amount,
      currency: original_currency as Currencies
    })
    await pool.query('COMMIT')
    res.status(200).json({ message: 'success', id: purchaseId }).send()
  } catch (error) {
    await pool.query('ROLLBACK')
    if (error instanceof Error) res.status(401).json({ error: error.message }).send()
  } finally {
    await pool.query('END')
  }
})

app.listen(port, () => console.log(`Running on port ${port}`))
