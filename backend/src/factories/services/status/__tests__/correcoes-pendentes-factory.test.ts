import { CorrecoesPendentesStatusHandler } from 'services/status/correcoes-pendentes'
import { makeCorrecoesPendentesStatusHandler } from '../correcoes-pendentes-factory'

describe('CorrecoesPendentesStatusHandler Factory', () => {
  it('should create a instance of CorrecoesPendentesStatusHandler', () => {
    const result = makeCorrecoesPendentesStatusHandler()

    expect(result).toBeInstanceOf(CorrecoesPendentesStatusHandler)
  })
})
