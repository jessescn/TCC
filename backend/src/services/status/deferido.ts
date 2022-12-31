import { ActorModel } from 'domain/models/actor'
import { ProcedimentoModel, Status } from 'domain/models/procedimento'
import { MailSender } from 'repositories/nodemailer/mail'
import { IFormularioRepository } from 'repositories/sequelize/formulario'
import { ITipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
import templates from 'templates'
import { HandlerProps, StatusHandler } from '.'

export class DeferidoStatusHandler implements StatusHandler {
  constructor(
    private tipoProcedimentoRepo: ITipoProcedimentoRepository,
    private formularioRepo: IFormularioRepository
  ) {}

  private getFormulariosByTipoId = async (tipoId: number) => {
    const tipoProcedimento = await this.tipoProcedimentoRepo.findOne(tipoId)

    const formularios = await this.formularioRepo.findAll({
      id: tipoProcedimento.formularios
    })

    return formularios
  }

  private sendEmailSecretaria = async (
    procedimento: ProcedimentoModel,
    autor: ActorModel
  ) => {
    // definir melhor quais emails devem ser enviados nessa etapa
    // envia um email a secretaria contendo as informacões necessárias para dar continuidade ao procedimento
    const emailSecretaria = process.env.SECRETARIA_EMAIL || ''

    const email = templates['approve-procedimento'](emailSecretaria, {
      procedimento
    })

    await MailSender.send(email)
  }

  execute = async ({ procedimento, autor }: HandlerProps) => {
    await this.sendEmailSecretaria(procedimento, autor)

    const status: Status = {
      status: 'deferido',
      data: new Date().toISOString()
    }

    return status
  }
}
