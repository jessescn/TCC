import { ColegiadoService } from 'services/colegiado'
import { makeColegiadoService } from '../colegiado-factory'

describe('ColegiadoService Factory', () => {
  it('should create a instance of ColegiadoService', () => {
    const result = makeColegiadoService()

    expect(result).toBeInstanceOf(ColegiadoService)
  })
})
