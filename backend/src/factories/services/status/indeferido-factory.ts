import { IndeferidoStatusHandler } from 'services/status/indeferido'

export const makeIndeferidoStatusHandler = () => {
  return new IndeferidoStatusHandler()
}
