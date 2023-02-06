import { ActorModel } from 'domain/models/actor'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ITipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
import { Request } from 'types/express'
import { UseCase } from 'usecases'

export class ActorSidebarUseCase implements UseCase {
  constructor(private tipoRepo: ITipoProcedimentoRepository) {}

  private checkIfTipoProcedimentoIsInInterval = (
    tipoProcedimento: TipoProcedimentoModel
  ) => {
    const today = new Date()
    const startDate = new Date(tipoProcedimento.dataInicio || '01-01-1999')
    const endDate = new Date(tipoProcedimento.dataFim || '01-01-2999')

    return startDate <= today && endDate >= today
  }

  private checkIfHasIntersectionInPublicos = (
    tipoProcedimento: TipoProcedimentoModel,
    actorPublicos: string[]
  ) => {
    const isPublicTipoProcedimento = tipoProcedimento.publicos.length === 0
    const intersection = tipoProcedimento.publicos.filter(publico =>
      actorPublicos.includes(publico)
    )

    return isPublicTipoProcedimento || intersection.length > 0
  }

  private filterAvailableTiposByActor(
    actor: ActorModel,
    tipoProcedimentos: TipoProcedimentoModel[]
  ) {
    return tipoProcedimentos.filter(tipo => {
      const isInInterval = this.checkIfTipoProcedimentoIsInInterval(tipo)
      const isInPublicos = this.checkIfHasIntersectionInPublicos(
        tipo,
        actor.publico
      )

      return isInInterval && isInPublicos
    })
  }

  private getActiveTipoProcedimentos = async () => {
    const tipoProcedimentos = await this.tipoRepo.findAll({
      status: 'ativo',
      deleted: false
    })

    return tipoProcedimentos
  }

  execute = async (request: Request) => {
    const activeTipoProcedimentos = await this.getActiveTipoProcedimentos()
    const availableTipos = this.filterAvailableTiposByActor(
      request.actor,
      activeTipoProcedimentos
    )

    return availableTipos
  }
}
