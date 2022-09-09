import { CorrecoesPendentesStatusHandler } from 'services/status/correcoes-pendentes'

export const makeCorrecoesPendentesStatusHandler = () => {
  return new CorrecoesPendentesStatusHandler()
}
