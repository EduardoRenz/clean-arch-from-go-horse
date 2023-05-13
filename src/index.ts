import express from 'express'
const app = express()
const port = 5000
const { Pool } = require('pg')
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

app.get('/', (_, res) => {
  res.status(200).json({ Hello: 'World' }).send()
})

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
