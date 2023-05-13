import express from 'express'
import bodyParser from 'body-parser'
const port = 5000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (_, res) => {
  res.status(200).json({ Hello: 'World' }).send()
})
app.listen(port, () => console.log(`Running on port ${port}`))
