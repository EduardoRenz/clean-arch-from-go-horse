import { Router } from 'express'
import UserUseCases from '../usecases/UserUseCases'
import { Currency } from '../entities/common'
import UserPostgresRepository from '../repositories/user/UserPostgresRepository'
const router = Router()
import pool from '../services/dbConnection'
const userRepository = new UserPostgresRepository(pool)

router.get('/currency_preference', async (req, res) => {
  const userId = 1
  const userUseCases = new UserUseCases(userRepository)
  const result = await userUseCases.getPreferredCurrency(userId)
  res.status(200).json({ preferred_currency: result }).send()
})

router.put('/currency_preference', async (req, res) => {
  const userId = 1
  const userUseCases = new UserUseCases(userRepository)
  const { currency } = req.body

  // IF not found
  if (!Object.values(Currency).some((curency) => curency === currency))
    return res.status(400).json({ error: 'invalid currency' }).send()

  await userUseCases.setPreferredCurrency(userId, currency as Currency)
  res.status(200).json({ message: 'success' }).send()
})

export default router
