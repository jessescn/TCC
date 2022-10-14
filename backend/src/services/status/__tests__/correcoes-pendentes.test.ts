import { CorrecoesPendentesStatusHandler } from '../correcoes-pendentes'

describe('CorrecoesPendentesStatus Handler', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
  })

  const sut = new CorrecoesPendentesStatusHandler()

  it('should return a new status', async () => {
    const result = await sut.execute()

    expect(result).toEqual({
      status: 'correcoes_pendentes',
      data: new Date('2020-01-01').toISOString()
    })
  })
})
