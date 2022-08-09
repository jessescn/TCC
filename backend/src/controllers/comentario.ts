import { ComentarioService } from 'services/entities/comentario-service'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'
import {
  checkPermissionResource,
  CrudController,
  errorResponseHandler,
  validateMandatoryFields
} from './'

type RemoteComentario = {
  conteudo: string
  procedimento: number
}

export const ComentarioController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteComentario = req.body

      const permission = req.user.permissoes.comentario_create

      checkPermissionResource(permission, req)

      const mandatoryFields = ['conteudo', 'procedimento']

      validateMandatoryFields(mandatoryFields, data)

      const newComentario = await ComentarioService.create({
        ...data,
        procedimentoId: data.procedimento,
        createdBy: req.user.id
      })

      res.status(HttpStatusCode.created).send(newComentario)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.comentario_read

      checkPermissionResource(permission, req)

      const comentarios = await ComentarioService.getAll()

      res.send(comentarios)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  readById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.comentario_read

      checkPermissionResource(permission, req)

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
      const permission = req.user.permissoes.comentario_update

      checkPermissionResource(permission, req)

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
      const permission = req.user.permissoes.comentario_delete

      checkPermissionResource(permission, req)

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
