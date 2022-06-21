import { errorResponseHandler } from 'controllers'
import { ProcessoService } from 'services/entities/processo-service'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'

export type RemoteCreateProcesso = {
  nome: string
  dataInicio: Date
  dataFim: Date
  formulario: number
  dadosPreenchidos: string
}

export const ProcessoController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteCreateProcesso = req.body

      const mandatoryFields = [
        'nome',
        'dataInicio',
        'dataFim',
        'formulario',
        'dadosPreenchidos'
      ]

      mandatoryFields.forEach(field => {
        if (!(field in data)) {
          throw new BadRequestError()
        }
      })

      const { nome, dataFim, dataInicio, formulario, dadosPreenchidos } = data

      const processo = await ProcessoService.create({
        nome,
        dataFim,
        dataInicio,
        dadosPreenchidos,
        formularioId: formulario,
        userId: req.user.id
      })

      res.status(HttpStatusCode.created).json(processo)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const processos =
        req.user.permissoes.process_read === 'all'
          ? await ProcessoService.getAll()
          : await ProcessoService.getAllByUser(req.user.id)

      return res.send(processos)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  readById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const processo = await ProcessoService.getById(Number(id))

      res.json(processo)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body

      if (!data || !isNumber(id)) {
        throw new BadRequestError()
      }

      const updatedProcess = await ProcessoService.update(Number(id), data)

      res.json(updatedProcess)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const deletedProcess = await ProcessoService.destroy(Number(id))

      res.json(deletedProcess)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
