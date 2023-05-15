import Transaction from '../../entities/Transaction'

export default interface TransactionRepository {
  getByUserId(userId: number): Promise<Transaction[]>
  createTransaction(transaction: Transaction): Promise<number>
}
