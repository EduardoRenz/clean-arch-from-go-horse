import { Currencies } from './common'

export default class Transaction {
  createdAt: Date
  originalCurrency: Currencies
  originalAmount: number
  currency: Currencies
  amount: number
  type: string
  userId: number

  constructor(
    userId: number,
    originalCurrency: Currencies,
    originalAmount: number,
    currency: Currencies,
    amount: number,
    type: string,
    createdAt: Date
  ) {
    this.createdAt = createdAt
    this.originalCurrency = originalCurrency
    this.originalAmount = originalAmount
    this.currency = currency
    this.amount = amount
    this.type = type
    this.userId = userId
  }
}
