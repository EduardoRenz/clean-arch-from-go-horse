import { Router } from 'express'
import pool from '../services/dbConnection'
import TransactionPostgresRepository from '../repositories/transaction/TransactionPostgresRepository'
import TransactionUseCases from '../usecases/TransactionUseCases'
const router = Router()

const transactionRepository = new TransactionPostgresRepository(pool)

router.get('/transactions', async (_, res) => {
  // suposes to get a user id from a token
  const userId = 1
  const transactionUseCases = new TransactionUseCases(userId, transactionRepository)
  const result = await transactionUseCases.get()
  res.status(200).json(result).send()
})

export default router
