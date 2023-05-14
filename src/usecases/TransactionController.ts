import { Client } from 'pg'
import { dbConnection } from '../defines'
import TransactionRepository from '../repositories/transaction/TransactionRepository'

export default class TransactionController {
  private userId: number
  private repository: TransactionRepository

  constructor(userId: number, repository: TransactionRepository) {
    this.userId = userId
    this.repository = repository
  }

  public async get(): Promise<any> {
    return await this.repository.getByUserId(this.userId)
  }

  public async createTransaction(): Promise<any> {}
}
