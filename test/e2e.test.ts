import axios from 'axios'
const baseUrl = 'http://localhost:5000'

const api = axios.create({
  baseURL: baseUrl
})

describe('Get tests', () => {
  it('Should get a user wallet', async () => {
    const userId = 1

    const response = await api.get(`/wallet`)
    const data = response.data

    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0].user_id).toBe(userId)
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
})
