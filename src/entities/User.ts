import { Currencies } from './common'

export default class User {
  id: number
  name: String
  preffered_currency: Currencies

  constructor(id: number, name: String, preffered_currency: Currencies) {
    this.id = id
    this.name = name
    this.preffered_currency = preffered_currency
  }
}
