import WalletController from '../src/usecases/WalletController'
import Wallet from '../src/entities/Wallet'

describe('WalletController', () => {
  it('Should get a user wallet info', async () => {
    const userId = 1
    const controller = new WalletController(userId)
    const result = await controller.get()

    expect(result).toBeInstanceOf(Wallet)

    expect(result.currencies.length).toBe(2)
    expect(result.ownerId).toBe(1)
  })

  it('Should get a unique currency from wallet', async () => {
    const userId = 1
    const controller = new WalletController(userId)
    const result = await controller.getByCurrency('BTC')

    expect(result.currency).toBe('BTC')
  })
})
