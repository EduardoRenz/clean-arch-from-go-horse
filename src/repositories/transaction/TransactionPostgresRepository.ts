import Transaction from '../../entities/Transaction'
import TransactionRepository from './TransactionRepository'

export default class TransactionPostgresRepository implements TransactionRepository {
  private dbConnection: any
  constructor(dbConnection: any) {
    this.dbConnection = dbConnection
  }
  async createTransaction(transaction: Transaction): Promise<number> {
    const new_id = await this.dbConnection.query(
      `
    INSERT INTO transactions (original_currency, original_amount, currency, amount, type, user_id) VALUES 
    ($1, $2, $3, $4, $5, $6) RETURNING id;`,
      [
        transaction.originalCurrency,
        transaction.originalAmount,
        transaction.currency,
        transaction.amount,
        transaction.type,
        transaction.userId
      ]
    )
    return new_id.rows[0].id
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
