import { CriadoStatusHandler } from 'services/status/criado'

export const makeCriadoStatusHandler = () => {
  return new CriadoStatusHandler()
}
