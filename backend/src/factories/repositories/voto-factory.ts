import { VotoRepository } from 'repositories/sequelize/voto'

export const makeVotoRepository = () => {
  return new VotoRepository()
}
