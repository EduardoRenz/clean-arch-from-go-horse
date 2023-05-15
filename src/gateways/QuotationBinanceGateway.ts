import axios from 'axios'
import QuotationGateway from './QuotationGateway'
import { Currency } from '../entities/common'

const isCriptoMapping = {
  [Currency.BTC]: true,
  [Currency.BRL]: false
}

export default class QuotationBinanceGateway implements QuotationGateway {
  async get(base: Currency, quote: Currency): Promise<number> {
    if (base === quote) return 1

    let newBase = base
    let newQuote = quote
    if (isCriptoMapping[quote]) {
      newQuote = base
      newBase = quote
    }
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${newBase}${newQuote}`
    const response = await axios.get(url)

    const price = newBase != base ? 1 / parseFloat(response.data['price']) : parseFloat(response.data['price'])
    return price
  }
}
