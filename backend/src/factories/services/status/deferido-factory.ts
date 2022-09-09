import { makeMailRepository } from 'factories/repositories/mail-factory'
import { DeferidoStatusHandler } from 'services/status/deferido'

export const makeDeferidoStatusHandler = () => {
  return new DeferidoStatusHandler(makeMailRepository())
}
