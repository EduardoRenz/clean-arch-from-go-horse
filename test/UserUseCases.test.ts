import UserMockRepository from '../src/repositories/user/UserMockRepository'
import UserUseCases from '../src/usecases/UserUseCases'
import { Currency } from '../src/entities/common'

describe('UserUseCases tests', () => {
  const userRepository = new UserMockRepository()
  const userUseCases = new UserUseCases(userRepository)

  it('Should get a user preferred currency and be BTC', async () => {
    const prefered = await userUseCases.getPreferredCurrency(1)
    expect(prefered).toBe(Currency.BTC)
  })

  it('Should set a preferred currency', async () => {
    // reset to a default
    await userUseCases.setPreferredCurrency(1, Currency.BTC)

    // get the preferred currency
    const prefered = await userUseCases.getPreferredCurrency(1)
    expect(prefered).toBe(Currency.BTC)

    //set another currency
    await userUseCases.setPreferredCurrency(1, Currency.BRL)
    const prefered2 = await userUseCases.getPreferredCurrency(1)
    expect(prefered2).toBe(Currency.BRL)
  })
})
