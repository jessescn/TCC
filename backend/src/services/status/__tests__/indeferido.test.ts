import { IndeferidoStatusHandler } from '../indeferido'

describe('IndeferidoStatus Handler', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
  })

  const sut = new IndeferidoStatusHandler()

  it('should return a new status', async () => {
    const result = await sut.execute()

    expect(result).toEqual({
      status: 'indeferido',
      data: new Date('2020-01-01').toISOString()
    })
  })
})
