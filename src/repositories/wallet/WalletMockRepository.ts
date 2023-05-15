import Wallet, { WalletCurrency } from '../../entities/Wallet'
import { Currency } from '../../entities/common'
import WalletRepository from './WalletRepository'

export default class WalletMockRepository implements WalletRepository {
  async getWalletByUserId(userId: number): Promise<Wallet> {
    return new Wallet(userId, [new WalletCurrency(Currency.BRL, 10), new WalletCurrency(Currency.BTC, 0.00001)])
  }
  async getCurrencyBalance(userId: number, currency: Currency): Promise<WalletCurrency> {
    return new WalletCurrency(currency, 0)
  }
}
