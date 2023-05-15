import { Currency } from './common'

export default class Transaction {
  createdAt: Date
  originalCurrency: Currency
  originalAmount: number
  currency: Currency
  amount: number
  type: string
  userId: number

  constructor(
    userId: number,
    originalCurrency: Currency,
    originalAmount: number,
    currency: Currency,
    amount: number,
    type: string,
    createdAt?: Date
  ) {
    this.createdAt = createdAt != null ? createdAt : new Date()
    this.originalCurrency = originalCurrency
    this.originalAmount = originalAmount
    this.currency = currency
    this.amount = amount
    this.type = type
    this.userId = userId
  }
}
