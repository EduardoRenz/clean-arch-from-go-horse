import Transaction from '../../entities/Transaction'
import TransactionRepository from './TransactionRepository'

export default class TransactionPostgresRepository implements TransactionRepository {
  private dbConnection: any
  constructor(dbConnection: any) {
    this.dbConnection = dbConnection
  }

  async getByUserId(userId: number): Promise<Transaction[]> {
    const result = await this.dbConnection.query('SELECT * FROM transactions where user_id = $1', [userId])

    const transactions = result.rows.map(
      (row: any) =>
        new Transaction(
          row.id,
          row.original_currency,
          row.original_amount,
          row.currency,
          row.amount,
          row.type,
          row.created_at
        )
    )

    return transactions
  }
}
