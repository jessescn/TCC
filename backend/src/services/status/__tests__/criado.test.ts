import { CriadoStatusHandler } from '../criado'

describe('CriadoStatus Handler', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
  })

  const sut = new CriadoStatusHandler()

  it('should return a new status', async () => {
    const result = await sut.execute()

    expect(result).toEqual({
      status: 'criado',
      data: new Date('2020-01-01').toISOString()
    })
  })
})
