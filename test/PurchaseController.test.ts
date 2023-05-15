import PurchaseController from '../src/usecases/PurchaseController'
import { dbConnection } from '../src/defines'
import { Pool } from 'pg'
import { Currency } from '../src/entities/common'
const pool = new Pool({ ...dbConnection })

describe('Test of purchase Controller', () => {
  it('Should make a purchase', async () => {
    const purchaseController = new PurchaseController(pool)
    const userId = 1
    const result = await purchaseController.purchase(userId, { amount: 1, currency: Currency.BRL })
    expect(result).not.toBeNaN()
    expect(result).toBeGreaterThan(0)
    await pool.end()
  })
})
