import Wallet, { WalletCurrency } from '../../entities/Wallet'
import { Currencies } from '../../entities/common'
import WalletRepository from './WalletRepository'

export default class WalletMockRepository implements WalletRepository {
  async getWalletByUserId(userId: number): Promise<Wallet> {
    return new Wallet(userId, [new WalletCurrency(Currencies.BRL, 10), new WalletCurrency(Currencies.BTC, 0.00001)])
  }
  async getCurrencyBalance(userId: number, currency: Currencies): Promise<WalletCurrency> {
    return new WalletCurrency(currency, 0)
  }
}
