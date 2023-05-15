import Wallet, { WalletCurrency } from '../entities/Wallet'
import { Currency } from '../entities/common'
import WalletRepository from '../repositories/wallet/WalletRepository'

export default class WalletUseCases {
  private userId
  private repository: WalletRepository

  constructor(userId: number, repository: WalletRepository) {
    this.userId = userId
    this.repository = repository
  }

  public async get(): Promise<Wallet> {
    const wallet = await this.repository.getWalletByUserId(this.userId)
    return wallet
  }

  public async getByCurrency(currency: String): Promise<WalletCurrency> {
    const wallet = this.repository.getCurrencyBalance(this.userId, currency as Currency)
    return wallet
  }
}
