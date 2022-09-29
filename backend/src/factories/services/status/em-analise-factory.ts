import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'
import { EmAnaliseStatusHandler } from 'services/status/em-analise'

export const makeEmAnaliseStatusHandler = () => {
  return new EmAnaliseStatusHandler(makeUsuarioRepository())
}
