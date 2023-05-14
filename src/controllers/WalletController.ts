import { Client } from 'pg'
import { dbConnection } from '../defines'
import Wallet, { WalletCurrency } from '../entities/Wallet'
import { Currencies } from '../entities/common'

export default class WalletController {
  private userId
  private client: any | undefined

  constructor(userId: number) {
    this.userId = userId

    this.client = new Client({ ...dbConnection })
  }

  public async get(): Promise<Wallet> {
    await this.client.connect()
    const result = await this.client.query('SELECT * FROM wallet where user_id = $1', [this.userId])
    await this.client.end()

    const currencies = result.rows.map((row: any) => new WalletCurrency(row.currency as Currencies, row.amount))
    const wallet = new Wallet(this.userId, currencies)

    return wallet
  }

  public async getByCurrency(currency: string): Promise<any> {
    await this.client.connect()
    const wallet = await this.client.query('SELECT * FROM wallet where user_id = $1 and currency = $2', [
      this.userId,
      currency
    ])
    await this.client.end()
    return wallet.rows[0]
  }
}
