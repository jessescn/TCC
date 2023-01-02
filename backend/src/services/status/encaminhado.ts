import { ForwardData, ProcedimentoHelper } from 'domain/helpers/procedimento'
import { ProcedimentoModel, Status } from 'domain/models/procedimento'
import { IFormularioRepository } from 'repositories/sequelize/formulario'
import { ITipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
import { NotFoundError } from 'types/express/errors'
import { HandlerProps, StatusHandler } from '.'
import { PDFGenerator } from 'repositories/pdf-generator/pdf'
import templates from 'templates'
import { MailSender } from 'repositories/nodemailer/mail'
import { removeFiles } from 'utils/file'
import { IActorRepository } from 'repositories/sequelize/actor'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ActorModel } from 'domain/models/actor'

export class EncaminhadoStatusHandler implements StatusHandler {
  constructor(
    private formularioRepo: IFormularioRepository,
    private tipoProcedimentoRepo: ITipoProcedimentoRepository,
    private actorRepo: IActorRepository
  ) {}

  private async checkIfTipoProcedimentoExists(procedimento: ProcedimentoModel) {
    if (!procedimento.tipo) {
      throw new NotFoundError('procedimento sem tipo relacionado')
    }

    const tipoProcedimento = await this.tipoProcedimentoRepo.findOne(
      procedimento.tipo
    )

    if (!tipoProcedimento) {
      throw new NotFoundError('tipo procedimento não existe')
    }

    return tipoProcedimento
  }

  private buildNewStatus() {
    const statusEncaminhado: Status = {
      status: 'encaminhado',
      data: new Date().toISOString()
    }

    return statusEncaminhado
  }

  private async sendEmailToSecretaria(
    autor: ActorModel,
    tipoProcedimento: TipoProcedimentoModel,
    forwardData: ForwardData[]
  ) {
    const filenames: string[] = []
    const secretariaEmail = process.env.SECRETARIA_EMAIL

    if (!secretariaEmail) return

    forwardData.forEach(data => {
      const timestamp = new Date().getTime()
      const identifier = `${timestamp}-&ˆ`
      const filename = `${identifier}${data.formulario.nome}.pdf`

      PDFGenerator.generateBasicPDF(data.data, filename)

      filenames.push(filename)
    })

    const attachments = filenames.map(filename => {
      const clearFilename = filename.split('-&ˆ')[1]

      return {
        filename: clearFilename,
        path: `uploads/${filename}`
      }
    })

    const email = templates['encaminhamento-secretaria'](secretariaEmail, {
      tipoProcedimento,
      autor
    })

    await MailSender.send(email, { attachments })

    await removeFiles(filenames, ['uploads'])
  }

  async execute({ procedimento }: HandlerProps) {
    const tipoProcedimento = await this.checkIfTipoProcedimentoExists(
      procedimento
    )

    const formularios = await this.formularioRepo.findAll({
      id: tipoProcedimento.formularios
    })

    const forwardData = ProcedimentoHelper.getForwardData(
      procedimento,
      formularios
    )

    const autor = await this.actorRepo.findOne(procedimento.createdBy)

    await this.sendEmailToSecretaria(autor, tipoProcedimento, forwardData)

    return this.buildNewStatus()
  }
}
