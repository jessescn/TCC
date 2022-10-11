import { IndeferidoStatusHandler } from 'services/status/indeferido'
import { makeIndeferidoStatusHandler } from '../indeferido-factory'

describe('IndeferidoStatusHandler Factory', () => {
  it('should create a instance of IndeferidoStatusHandler', () => {
    const result = makeIndeferidoStatusHandler()

    expect(result).toBeInstanceOf(IndeferidoStatusHandler)
  })
})
