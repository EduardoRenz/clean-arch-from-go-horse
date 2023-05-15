import exp from 'constants'
import { Currency } from '../src/entities/common'
import QuotationCryptoCompareGateway from '../src/gateways/QuotationCryptoCompareGateway'

describe('Quotation gateways tests', () => {
  it('Should get a user preferred currency and be BTC', async () => {
    const cryptocompareGateway = new QuotationCryptoCompareGateway()

    const btcBrl = await cryptocompareGateway.get(Currency.BTC, Currency.BRL)
    expect(btcBrl).not.toBeNaN()
    expect(btcBrl).toBeGreaterThan(0)

    const brlBtc = await cryptocompareGateway.get(Currency.BRL, Currency.BTC)
    expect(brlBtc).not.toBeNaN()
    expect(brlBtc).toBeGreaterThan(0)
  })
})
