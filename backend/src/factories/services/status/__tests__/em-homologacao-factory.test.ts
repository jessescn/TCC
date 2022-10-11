import { EmHomologacaoStatusHandler } from 'services/status/em-homologacao'
import { makeEmHomologacaoStatusHandler } from '../em-homologacao-factory'

describe('EmHomologacaoStatusHandler Factory', () => {
  it('should create a instance of EmHomologacaoStatusHandler', () => {
    const result = makeEmHomologacaoStatusHandler()

    expect(result).toBeInstanceOf(EmHomologacaoStatusHandler)
  })
})
