import { ProcedimentoRepository } from 'repositories/sequelize/procedimento'

export const makeProcedimentoRepository = () => {
  return new ProcedimentoRepository()
}
