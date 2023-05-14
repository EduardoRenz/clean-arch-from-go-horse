import UserMockRepository from '../src/repositories/UserMockRepository'
import UserUseCases from '../src/usecases/UserUseCases'
import { Currencies } from '../src/entities/common'

describe('UserUseCases tests', () => {
  const userRepository = new UserMockRepository()
  const userUseCases = new UserUseCases(userRepository)

  it('Should get a user preferred currency and be BTC', async () => {
    const prefered = await userUseCases.getPreferredCurrency(1)
    expect(prefered).toBe(Currencies.BTC)
  })
})
