import { DeferidoStatusHandler } from 'services/status/deferido'

export const makeDeferidoStatusHandler = () => {
  return new DeferidoStatusHandler()
}
