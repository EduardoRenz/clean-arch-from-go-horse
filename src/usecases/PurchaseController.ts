import { Currencies } from '../entities/common'
import UserPostgresRepository from '../repositories/user/UserPostgresRepository'
import UserRepository from '../repositories/user/UserRepository'
import UserUseCases from './UserUseCases'
import axios from 'axios'
import WalletController from './WalletController'

export type PurchaseParams = {
  amount: number
  currency: Currencies
}

export default class PurchaseController {
  userRepository: UserRepository
  userUseCases: UserUseCases
  dbConnection: any

  constructor(dbConnection: any) {
    this.userRepository = new UserPostgresRepository(dbConnection)
    this.userUseCases = new UserUseCases(this.userRepository)
    this.dbConnection = dbConnection
  }

  async purchase(userId: number, purchaseData: PurchaseParams): Promise<number> {
    // Get user prefered currency
    const prefered_currency = await this.userUseCases.getPreferredCurrency(userId)
    // Get the data from the request
    const current_quotation = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${purchaseData.currency}&tsyms=${prefered_currency}`
    )
    const amount = purchaseData.amount * current_quotation.data[prefered_currency]
    const walletController = new WalletController(userId)
    const currencyBalance = await walletController.getByCurrency(prefered_currency)

    if (currencyBalance.amount < amount) throw new Error('insufficient balance')

    const new_transaction = await this.dbConnection.query(
      `
    INSERT INTO transactions (original_currency, original_amount, currency, amount, type, user_id) VALUES 
    ($1, $2, $3, $4, $5, $6) RETURNING id;`,
      [purchaseData.currency, purchaseData.amount, prefered_currency, amount, 'DEBIT', userId]
    )

    // reduce user balance in wallet
    await this.dbConnection.query('UPDATE wallet SET amount = amount - $1 WHERE user_id = $2 and currency = $3', [
      amount,
      userId,
      prefered_currency
    ])

    return new_transaction.rows[0].id
  }
}
