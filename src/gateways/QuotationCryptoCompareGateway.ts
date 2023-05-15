import { Currency } from '../entities/common'
import QuotationGateway from './QuotationGateway'
import axios from 'axios'

export default class QuotationCryptoCompareGateway implements QuotationGateway {
  async get(base: Currency, quote: Currency): Promise<number> {
    const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${base}&tsyms=${quote}`)
    return response.data[quote]
  }
}
