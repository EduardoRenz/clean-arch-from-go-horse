import User from '../../entities/User'
import { Currency } from '../../entities/common'

export default interface UserRepository {
  getUserById(userId: number): Promise<User>
  getPreferredCurrency(userId: number): Promise<Currency>
  setPreferredCurrency(userId: number, currency: Currency): Promise<void>
}
