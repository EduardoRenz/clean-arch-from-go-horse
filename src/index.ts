import express from 'express'
const app = express()
const port = 5000

import { Connection } from 'postgresql-client'

const user = 'user'
const password = 'user'
const dbName = 'postgres'

const connection = new Connection(`postgres://${user}:${password}@localhost/${dbName}`)

app.get('/', (_, res) => {
  res.status(200).json({ Hello: 'World' }).send()
})

app.get('/wallet', async (_, res) => {
  // suposes to get a user id from a token
  const userId = 1

  await connection.connect()
  const result = await connection.query('SELECT * FROM wallet where user_id = $1', {
    params: [userId],
    objectRows: true
  })
  await connection.close()
  res.status(200).json(result.rows).send()
})

app.listen(port, () => console.log(`Running on port ${port}`))
