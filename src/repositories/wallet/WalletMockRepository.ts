import Wallet, { WalletCurrency } from '../../entities/Wallet'
import { Currency } from '../../entities/common'
import WalletRepository from './WalletRepository'

const wallet = new Wallet(1, [new WalletCurrency(Currency.BRL, 10), new WalletCurrency(Currency.BTC, 0.00001)])

export default class WalletMockRepository implements WalletRepository {
  async updateCurrencyBalance(userId: number, currency: Currency, amount: number): Promise<void> {
    const currencyIndex = wallet.currencies.findIndex((walletCurrency) => walletCurrency.currency === currency)
    if (currencyIndex === -1) throw new Error('Currency not found')
    wallet.currencies[currencyIndex].amount = amount
  }
  async getWalletByUserId(userId: number): Promise<Wallet> {
    return wallet
  }
  async getCurrencyBalance(userId: number, currency: Currency): Promise<WalletCurrency> {
    const walletCurrency = wallet.currencies.find((walletCurrency) => walletCurrency.currency === currency)
    if (walletCurrency == undefined) throw new Error('Currency not found')
    return walletCurrency
  }
}
