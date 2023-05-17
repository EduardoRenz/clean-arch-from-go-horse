import { Router } from 'express'
import { Currency } from '../entities/common'
import PurchaseController from '../usecases/PurchaseController'
import pool from '../services/dbConnection'
const router = Router()

function checkPurchaseParams(body: any) {
  if (!body.amount || !body.currency) throw new Error('Missing amount or currency')
}

function checkIsValidCurrency(currency: any) {
  // Check if currency is valid
  const validCurrencies = Object.values(Currency)
  if (!validCurrencies.includes(currency)) throw new Error('Invalid currency')
}

router.post('/purchase', async (req, res) => {
  const userId = 1
  const { amount: originalAmount, currency: originalCurrency } = req.body

  try {
    checkPurchaseParams(req.body)
    checkIsValidCurrency(originalCurrency)

    const purchaseController = new PurchaseController(pool)
    const purchaseId = await purchaseController.purchase(userId, {
      amount: originalAmount,
      currency: originalCurrency as Currency
    })
    res.status(200).json({ message: 'success', id: purchaseId }).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message }).send()
    }
  }
})

export default router
