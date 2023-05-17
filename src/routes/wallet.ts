import { Router } from 'express'
import WalletController from '../usecases/WalletUseCases'
import WalletPostgresRepository from '../repositories/wallet/WalletPostgresRepository'
import pool from '../services/dbConnection'

const walletRepository = new WalletPostgresRepository(pool)
const router = Router()

router.get('/wallet', async (_, res) => {
  const userId = 1
  const walletController = new WalletController(userId, walletRepository)
  const result = await walletController.get()
  res.status(200).json(result).send()
})

export default router
