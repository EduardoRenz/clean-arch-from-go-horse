import express from 'express'
import bodyParser from 'body-parser'
import { Pool } from 'pg'
import axios from 'axios'

const port = 5000
const user = 'user'
const password = 'user'
const dbName = 'postgres'

const pool = new Pool({
  user,
  host: 'localhost',
  database: dbName,
  password,
  port: 5432
})

pool.connect()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/wallet', async (_, res) => {
  // suposes to get a user id from a token
  const userId = 1
  const result = await pool.query('SELECT * FROM wallet where user_id = $1', [userId])
  res.status(200).json(result.rows).send()
})

app.get('/transactions', async (_, res) => {
  // suposes to get a user id from a token
  const userId = 1
  const result = await pool.query('SELECT * FROM transactions where user_id = $1', [userId])
  res.status(200).json(result.rows).send()
})

app.post('/transaction', async (req, res) => {
  try {
    // suposes to get a user id from a token
    const userId = 1

    // Get user prefered currency
    const user = await pool.query('SELECT * FROM users where id = $1', [userId])
    const prefered_currency = user.rows[0].preferred_currency

    // Get the data from the request
    const { amount: original_amount, currency: original_currency } = req.body

    const current_quotation = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${prefered_currency}&tsyms=${original_currency}`
    )

    const amount = original_amount * current_quotation.data[prefered_currency]

    await pool.query('BEGIN')

    const result = await pool.query(
      `
    INSERT INTO transactions (original_currency, original_amount, currency, amount, type, user_id) VALUES 
    ($1, $2, $3, $4, $5, $6, $7)`,
      [original_amount, original_currency, amount, prefered_currency, amount, 'PURCHASE', userId]
    )

    await pool.query('COMMIT')

    res.status(200).json(result.rows).send()
  } catch (error) {
    console.log(error)
    res.status(500).send()
    await pool.query('ROLLBACK')
  } finally {
    await pool.query('END')
  }
})

app.listen(port, () => console.log(`Running on port ${port}`))
