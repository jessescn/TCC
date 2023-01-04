import { ActorModel } from 'domain/models/actor'
import { ProcedimentoModel, Status, TStatus } from 'domain/models/procedimento'
import { makeCorrecoesPendentesStatusHandler } from 'factories/services/status/correcoes-pendentes-factory'
import { makeCriadoStatusHandler } from 'factories/services/status/criado-factory'
import { makeDeferidoStatusHandler } from 'factories/services/status/deferido-factory'
import { makeEmAnaliseStatusHandler } from 'factories/services/status/em-analise-factory'
import { makeEmHomologacaoStatusHandler } from 'factories/services/status/em-homologacao-factory'
import { makeEncaminhadoStatusHandler } from 'factories/services/status/encaminhado-factory'
import { makeIndeferidoStatusHandler } from 'factories/services/status/indeferido-factory'

export type HandlerProps = {
  procedimento: ProcedimentoModel
  autor: ActorModel
}

export interface StatusHandler {
  execute: (props: HandlerProps) => Promise<Status>
}

export const StatusHandlerMap: Record<TStatus, StatusHandler> = {
  criado: makeCriadoStatusHandler(),
  em_analise: makeEmAnaliseStatusHandler(),
  correcoes_pendentes: makeCorrecoesPendentesStatusHandler(),
  deferido: makeDeferidoStatusHandler(),
  em_homologacao: makeEmHomologacaoStatusHandler(),
  indeferido: makeIndeferidoStatusHandler(),
  encaminhado: makeEncaminhadoStatusHandler()
}
