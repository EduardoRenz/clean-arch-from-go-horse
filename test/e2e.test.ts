import axios from 'axios'
import Wallet from '../src/entities/Wallet'
const baseUrl = 'http://localhost:5000'

const api = axios.create({
  baseURL: baseUrl
})

describe('Get tests', () => {
  it('Should get a user wallet', async () => {
    const userId = 1

    const response = await api.get(`/wallet`)
    const data = response.data

    expect(data.currencies.length).toBeGreaterThan(0)
    expect(data.ownerId).toBe(userId)
  })

  it('Should get a user transactions', async () => {
    const userId = 1

    const response = await api.get(`/transactions`)
    const data = response.data

    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0].user_id).toBe(userId)
  })

  it('Should get and switch uer currency preference', async () => {
    const userId = 1

    // force set
    await api.put(`/currency_preference`, { currency: 'BRL' })

    const response = await api.get(`/currency_preference`)
    const data = response.data

    expect(data).toBeInstanceOf(Object)
    expect(data.preferred_currency).toBe('BRL')

    // change to BTC

    await api.put(`/currency_preference`, { currency: 'BTC' })

    const response2 = await api.get(`/currency_preference`)
    const data2 = response2.data

    expect(data2).toBeInstanceOf(Object)
    expect(data2.preferred_currency).toBe('BTC')
  })

  it('Should correcty make a purchase with BRL as prefered currency', async () => {
    const userId = 1
    const AMOUNT = 10
    const CURRENCY = 'BRL'

    // ensure prefered currency is BRL
    await api.put(`/currency_preference`, { currency: CURRENCY })

    // check if prefered currency is BRL
    const preferred_currency_response = await api.get(`/currency_preference`)
    expect(preferred_currency_response.data.preferred_currency).toBe(CURRENCY)

    // Get current wallet amount
    const wallet_response = await api.get(`/wallet`)
    const brl_amount = parseFloat(
      wallet_response.data.currencies.filter((wallet: any) => wallet.currency === CURRENCY)[0].amount
    )

    const response = await api.post(`/purchase`, {
      amount: AMOUNT,
      currency: CURRENCY
    })

    // expect message to be success
    expect(response.status).toBe(200)
    expect(response.data.message).toBe('success')

    // New wallet amount
    const new_wallet_response = await api.get(`/wallet`)
    const new_brl_amount = parseFloat(
      new_wallet_response.data.currencies.filter((wallet: any) => wallet.currency === CURRENCY)[0].amount
    )

    expect(new_brl_amount).toBe(brl_amount - AMOUNT)
  })

  it('Should correcty make a purchase with BTC as prefered currency', async () => {
    const userId = 1
    const AMOUNT = 0.00000001
    const CURRENCY = 'BTC'

    // ensure prefered currency is BTC
    await api.put(`/currency_preference`, { currency: CURRENCY })

    // Get current wallet amount
    const wallet_response = await api.get(`/wallet`)
    const btc_amount = parseFloat(
      wallet_response.data.currencies.filter((wallet: any) => wallet.currency === CURRENCY)[0].amount
    ).toFixed(8)

    const response = await api.post(`/purchase`, {
      amount: AMOUNT,
      currency: CURRENCY
    })

    // expect message to be success
    expect(response.status).toBe(200)
    expect(response.data.message).toBe('success')

    // New wallet amount
    const new_wallet_response = await api.get(`/wallet`)
    const new_btc_amount = parseFloat(
      new_wallet_response.data.currencies.filter((wallet: any) => wallet.currency === CURRENCY)[0].amount
    )

    expect(new_btc_amount).toBe(parseFloat(btc_amount) - AMOUNT)
  })
})
