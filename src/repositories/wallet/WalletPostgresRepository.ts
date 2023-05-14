import Wallet, { WalletCurrency } from '../../entities/Wallet'
import { Currencies } from '../../entities/common'
import WalletRepository from './WalletRepository'

export default class WalletPostgresRepository implements WalletRepository {
  dbConnection: any

  constructor(dbConnection: any) {
    this.dbConnection = dbConnection
  }
  async getCurrencyBalance(userId: number, currency: Currencies): Promise<WalletCurrency> {
    const response = await this.dbConnection.query('SELECT * FROM wallet where user_id = $1 and currency = $2', [
      userId,
      currency
    ])
    return new WalletCurrency(response.rows[0].currency as Currencies, response.rows[0].amount)
  }

  async getWalletByUserId(userId: number): Promise<Wallet> {
    const result = await this.dbConnection.query('SELECT * FROM wallet where user_id = $1', [userId])
    const currencies = result.rows.map((row: any) => new WalletCurrency(row.currency as Currencies, row.amount))
    const wallet = new Wallet(userId, currencies)
    return wallet
  }
}
