import User from '../entities/User'
import { Currencies } from '../entities/common'
import UserRepository from '../repositories/user/UserRepository'

export default class UserUseCases {
  repository: UserRepository

  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async getUserById(userId: number): Promise<User> {
    return await this.repository.getUserById(userId)
  }

  async getPreferredCurrency(userId: number): Promise<Currencies> {
    return await this.repository.getPreferredCurrency(userId)
  }

  async setPreferredCurrency(userId: number, currency: Currencies): Promise<void> {
    await this.repository.setPreferredCurrency(userId, currency)
  }
}
