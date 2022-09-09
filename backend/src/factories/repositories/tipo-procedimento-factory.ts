import { TipoProcedimentoRepository } from 'repository/sequelize/tipo-procedimento'

export const makeTipoProcedimentoRepository = () => {
  return new TipoProcedimentoRepository()
}
