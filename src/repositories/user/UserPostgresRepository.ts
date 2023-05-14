import User from '../../entities/User'
import { Currencies } from '../../entities/common'
import UserRepository from './UserRepository'

export default class UserPostgresRepository implements UserRepository {
  private dbConnection: any

  constructor(dbConnection: any) {
    this.dbConnection = dbConnection
  }
  async setPreferredCurrency(userId: number, currency: Currencies): Promise<void> {
    await this.dbConnection.query('UPDATE users SET preferred_currency = $1 WHERE id = $2', [currency, userId])
  }

  getUserById(userId: number): Promise<User> {
    throw new Error('Method not implemented.')
  }
  async getPreferredCurrency(userId: number): Promise<Currencies> {
    const user = await this.dbConnection.query('SELECT preferred_currency FROM users where id = $1', [userId])
    return user.rows[0].preferred_currency as Currencies
  }
}
