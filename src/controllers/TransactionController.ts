import { Client } from 'pg'
import { dbConnection } from '../defines'

export default class TransactionController {
  private userId: number
  private client: any

  constructor(userId: number) {
    this.userId = userId
    this.client = new Client({ ...dbConnection })
  }

  public async get(): Promise<any> {
    this.client.connect()
    const result = await this.client.query('SELECT * FROM transactions where user_id = $1', [this.userId])
    this.client.end()
    return result.rows
  }
}
