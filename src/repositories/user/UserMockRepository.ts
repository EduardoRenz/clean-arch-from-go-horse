import User from '../../entities/User'
import { Currencies } from '../../entities/common'
import UserRepository from './UserRepository'

const preferreds = [{ userId: 1, preferred: Currencies.BTC }]

export default class UserMockRepository implements UserRepository {
  async setPreferredCurrency(userId: number, currency: Currencies): Promise<void> {
    const index = preferreds.findIndex((preferred) => preferred.userId === userId)
    preferreds[index].preferred = currency
  }
  getUserById(userId: number): Promise<User> {
    throw new Error('Method not implemented.')
  }
  async getPreferredCurrency(userId: number): Promise<Currencies> {
    return preferreds.find((preferred) => preferred.userId === userId)?.preferred || Currencies.BRL
  }
}
