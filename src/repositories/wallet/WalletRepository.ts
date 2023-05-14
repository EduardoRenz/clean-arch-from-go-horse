import Wallet, { WalletCurrency } from '../../entities/Wallet'
import { Currencies } from '../../entities/common'

export default interface WalletRepository {
  getWalletByUserId(userId: number): Promise<Wallet>
  getCurrencyBalance(userId: number, currency: Currencies): Promise<WalletCurrency>
}
