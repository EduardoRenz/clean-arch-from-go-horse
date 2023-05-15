import exp from 'constants'
import { Currency } from '../src/entities/common'
import QuotationCryptoCompareGateway from '../src/gateways/QuotationCryptoCompareGateway'
import QuotationBinanceGateway from '../src/gateways/QuotationBinanceGateway'

describe('Quotation gateways tests', () => {
  it('Should get a user preferred currency and be BTC', async () => {
    const cryptocompareGateway = new QuotationCryptoCompareGateway()
    const binanceGateway = new QuotationBinanceGateway()
    const compareBTCBRL = await cryptocompareGateway.get(Currency.BTC, Currency.BRL)
    expect(compareBTCBRL).not.toBeNaN()
    expect(compareBTCBRL).toBeGreaterThan(0)

    const compareBRLBTC = await cryptocompareGateway.get(Currency.BRL, Currency.BTC)
    expect(compareBRLBTC).not.toBeNaN()
    expect(compareBRLBTC).toBeGreaterThan(0)

    const binanceBTCBRL = await binanceGateway.get(Currency.BTC, Currency.BRL)
    expect(binanceBTCBRL).not.toBeNaN()
    expect(binanceBTCBRL).toBeGreaterThan(0)

    const binanceBRLBTC = await binanceGateway.get(Currency.BRL, Currency.BTC)
    expect(binanceBRLBTC).not.toBeNaN()
    expect(binanceBRLBTC).toBeGreaterThan(0)

    expect(compareBRLBTC).toBeCloseTo(binanceBRLBTC)
    expect(Math.abs(compareBTCBRL - binanceBTCBRL)).toBeLessThan(100)
  })
})
