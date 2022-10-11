import { CriadoStatusHandler } from 'services/status/criado'
import { makeCriadoStatusHandler } from '../criado-factory'

describe('CriadoStatusHandler Factory', () => {
  it('should create a instance of CriadoStatusHandler', () => {
    const result = makeCriadoStatusHandler()

    expect(result).toBeInstanceOf(CriadoStatusHandler)
  })
})
