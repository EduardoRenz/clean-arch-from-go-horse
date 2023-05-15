import { Currency } from '../entities/common'
import UserPostgresRepository from '../repositories/user/UserPostgresRepository'
import UserRepository from '../repositories/user/UserRepository'
import WalletRepository from '../repositories/wallet/WalletRepository'
import WalletPostgresRepository from '../repositories/wallet/WalletPostgresRepository'
import QuotationGateway from '../gateways/QuotationGateway'
import QuotationCryptoCompareGateway from '../gateways/QuotationCryptoCompareGateway'
import QuotationBinanceGateway from '../gateways/QuotationBinanceGateway'
import TransactionRepository from '../repositories/transaction/TransactionRepository'
import TransactionPostgresRepository from '../repositories/transaction/TransactionPostgresRepository'
import Transaction from '../entities/Transaction'

export type PurchaseParams = {
  amount: number
  currency: Currency
}

export default class PurchaseController {
  userRepository: UserRepository
  walletRepository: WalletRepository
  quotationGateway: QuotationGateway
  transactionRepository: TransactionRepository
  dbConnection: any

  constructor(dbConnection: any) {
    this.userRepository = new UserPostgresRepository(dbConnection)
    this.walletRepository = new WalletPostgresRepository(dbConnection)
    this.quotationGateway = new QuotationBinanceGateway()
    this.transactionRepository = new TransactionPostgresRepository(dbConnection)
    this.dbConnection = dbConnection
  }

  async purchase(userId: number, purchaseData: PurchaseParams): Promise<number> {
    // Get user prefered currency
    const prefered_currency = await this.userRepository.getPreferredCurrency(userId)
    // Get the data from the request

    const current_quotation = await this.quotationGateway.get(purchaseData.currency, prefered_currency)

    const amount = purchaseData.amount * current_quotation
    const currencyBalance = await this.walletRepository.getCurrencyBalance(userId, prefered_currency)
    if (currencyBalance.amount < amount) throw new Error('insufficient balance')

    const new_transaction = await this.transactionRepository.createTransaction(
      new Transaction(userId, purchaseData.currency, purchaseData.amount, prefered_currency, amount, 'DEBIT')
    )

    // reduce user balance in wallet
    await this.dbConnection.query('UPDATE wallet SET amount = amount - $1 WHERE user_id = $2 and currency = $3', [
      amount,
      userId,
      prefered_currency
    ])

    return new_transaction
  }
}