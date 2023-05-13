import { Client } from 'pg'
const user = 'user'
const password = 'user'
const dbName = 'postgres'

export default class WalletController {
  private userId: number | undefined
  private client: any | undefined

  constructor(userId: number) {
    this.userId = userId

    this.client = new Client({
      user,
      host: 'localhost',
      database: dbName,
      password,
      port: 5432
    })
  }

  public async get(): Promise<any> {
    this.client.connect()
    const result = await this.client.query('SELECT * FROM wallet where user_id = $1', [this.userId])
    this.client.end()
    return result
  }
}
