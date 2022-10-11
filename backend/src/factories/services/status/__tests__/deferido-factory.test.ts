import { DeferidoStatusHandler } from 'services/status/deferido'
import { makeDeferidoStatusHandler } from '../deferido-factory'

describe('DeferidoStatusHandler Factory', () => {
  it('should create a instance of DeferidoStatusHandler', () => {
    const result = makeDeferidoStatusHandler()

    expect(result).toBeInstanceOf(DeferidoStatusHandler)
  })
})
