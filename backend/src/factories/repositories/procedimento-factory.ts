import { ProcedimentoRepository } from 'repository/sequelize/procedimento'

export const makeProcedimentoRepository = () => {
  return new ProcedimentoRepository()
}
