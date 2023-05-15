import { Currency } from '../entities/common'

export default interface QuotationGateway {
  get(base: Currency, quote: Currency): Promise<number>
}
