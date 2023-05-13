import express from 'express'
import bodyParser from 'body-parser'
import { Pool } from 'pg'
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

app.listen(port, () => console.log(`Running on port ${port}`))
