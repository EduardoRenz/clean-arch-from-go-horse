import Wallet, { WalletCurrency } from '../../entities/Wallet'
import { Currency } from '../../entities/common'

export default interface WalletRepository {
  getWalletByUserId(userId: number): Promise<Wallet>
  getCurrencyBalance(userId: number, currency: Currency): Promise<WalletCurrency>
  updateCurrencyBalance(userId: number, currency: Currency, amount: number): Promise<void>
}
