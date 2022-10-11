import { EmAnaliseStatusHandler } from 'services/status/em-analise'
import { makeEmAnaliseStatusHandler } from '../em-analise-factory'

describe('EmAnaliseStatusHandler Factory', () => {
  it('should create a instance of EmAnaliseStatusHandler', () => {
    const result = makeEmAnaliseStatusHandler()

    expect(result).toBeInstanceOf(EmAnaliseStatusHandler)
  })
})
