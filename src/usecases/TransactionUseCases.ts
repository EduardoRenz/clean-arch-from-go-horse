import Transaction from '../entities/Transaction'
import TransactionRepository from '../repositories/transaction/TransactionRepository'

export default class TransactionUseCases {
  private userId: number
  private repository: TransactionRepository

  constructor(userId: number, repository: TransactionRepository) {
    this.userId = userId
    this.repository = repository
  }

  public async get(): Promise<any> {
    return await this.repository.getByUserId(this.userId)
  }

  public async createTransaction(transaction: Transaction): Promise<any> {
    return await this.repository.createTransaction(transaction)
  }
}
