import { Currency } from './common'

export default class User {
  id: number
  name: String
  preffered_currency: Currency = Currency.BRL

  constructor(id: number, name: String, preffered_currency?: Currency) {
    this.id = id
    this.name = name
    if (preffered_currency != null) this.preffered_currency = preffered_currency
  }
}
