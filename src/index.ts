import express from 'express'
import bodyParser from 'body-parser'

import purchaseRoutes from './routes/purchase'
import walletRoutes from './routes/wallet'
import userRoutes from './routes/user'
import transactionsRoutes from './routes/transactions'

const port = 5000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(transactionsRoutes)
app.use(userRoutes)
app.use(walletRoutes)
app.use(purchaseRoutes)
app.listen(port, () => console.log(`Running on port ${port}`))
