import { CrudController, errorResponseHandler } from 'controllers'
import {
  RemoteCreateProcesso,
  ProcessoService
} from 'services/entities/processo-service'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'

export const ProcessoController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteCreateProcesso = req.body

      const mandatoryFields = [
        'nome',
        'data_inicio',
        'data_fim',
        'formulario',
        'dados_preenchidos'
      ]

      mandatoryFields.forEach(field => {
        if (!(field in data)) {
          throw new BadRequestError()
        }
      })

      const process = await ProcessoService.create({
        ...data,
        usuario: req.user.id
      })

      res.status(HttpStatusCode.created).json(process)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const processes = await ProcessoService.getAll()

      res.send(processes)
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

      const process = await ProcessoService.getById(Number(id))

      res.json(process)
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
