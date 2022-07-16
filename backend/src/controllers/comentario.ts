import { ComentarioService } from 'services/entities/comentario-service'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'
import {
  CrudController,
  errorResponseHandler,
  validateMandatoryFields
} from './'

type RemoteComentario = {
  conteudo: string
  processo: number
  comentarioMae?: number
}

export const ComentarioController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteComentario = req.body

      const mandatoryFields = ['conteudo', 'processo']

      validateMandatoryFields(mandatoryFields, data)

      const comentario = await ComentarioService.create({
        ...data,
        processoId: data.processo,
        createdBy: req.user.id
      })

      res.status(HttpStatusCode.created).json(comentario)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const comentarios = await ComentarioService.getAll()
      res.send(comentarios)
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

      const comentario = await ComentarioService.getById(Number(id))

      res.json(comentario)
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

      const updatedComentario = await ComentarioService.update(Number(id), data)

      res.json(updatedComentario)
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

      const deletedComentario = await ComentarioService.destroy(Number(id))

      res.json(deletedComentario)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
