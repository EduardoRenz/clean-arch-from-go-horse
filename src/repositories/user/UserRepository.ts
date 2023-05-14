import User from '../../entities/User'
import { Currencies } from '../../entities/common'

export default interface UserRepository {
  getUserById(userId: number): Promise<User>
  getPreferredCurrency(userId: number): Promise<Currencies>
  setPreferredCurrency(userId: number, currency: Currencies): Promise<void>
}
