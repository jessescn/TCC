import { TipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'

export const makeTipoProcedimentoRepository = () => {
  return new TipoProcedimentoRepository()
}
