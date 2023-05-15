import axios from 'axios'
import QuotationGateway from './QuotationGateway'

export default class QuotationBinanceGateway implements QuotationGateway {
  async get(base: string, quote: string): Promise<number> {
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${base}${quote}`)
    return response.data['price']
  }
}
