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

    expect(data.every((item: any) => item.amount > 0)).toBeTruthy()
  })
})
