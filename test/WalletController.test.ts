import WalletController from '../src/controllers/WalletController'

describe('WalletController', () => {
  it('Should get a user wallet info', async () => {
    const userId = 1
    const controller = new WalletController(userId)
    const result = await controller.get()

    expect(result.rows.length).toBe(2)
    expect(result.rows[0].user_id).toBe(1)
  })

  it('Should get a unique currency from wallet', async () => {
    const userId = 1
    const controller = new WalletController(userId)
    const result = await controller.getByCurrency('BTC')

    expect(result.currency).toBe('BTC')
  })
})
