import { Currency } from './common'

export class WalletCurrency {
  currency: Currency
  amount: number

  constructor(currency: Currency, amount: number) {
    this.currency = currency
    this.amount = amount
  }

  public toObject() {
    return {
      currency: this.currency,
      amount: this.amount
    }
  }
}

export default class {
  ownerId: number
  currencies: WalletCurrency[]

  constructor(ownerId: number, currencies: WalletCurrency[]) {
    this.ownerId = ownerId
    this.currencies = currencies
  }

  public toObject() {
    return {
      ownerId: this.ownerId,
      currencies: this.currencies.map((currency) => currency.toObject())
    }
  }
}
