import WalletUseCases from '../src/usecases/WalletUseCases'
import Wallet from '../src/entities/Wallet'
import WalletMockRepository from '../src/repositories/wallet/WalletMockRepository'

describe('WalletController', () => {
  const repository = new WalletMockRepository()
  it('Should get a user wallet info', async () => {
    const userId = 1
    const controller = new WalletUseCases(userId, repository)
    const result = await controller.get()

    expect(result).toBeInstanceOf(Wallet)

    expect(result.currencies.length).toBe(2)
    expect(result.ownerId).toBe(1)
  })

  it('Should get a unique currency from wallet', async () => {
    const userId = 1
    const controller = new WalletUseCases(userId, repository)
    const result = await controller.getByCurrency('BTC')

    expect(result.currency).toBe('BTC')
  })
})
