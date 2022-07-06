import { checkPermissionResource, errorResponseHandler } from 'controllers'
import { ProcessoService } from 'services/entities/processo-service'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'

export const ProcessoController = {
  create: async (req: Request, res: Response) => {
    try {
      const data = req.body

      if (!data.resposta || !data.tipo_processo) {
        throw new BadRequestError()
      }

      const newResource = await ProcessoService.create({
        autor: req.user.id,
        tipo: req.body.tipo_processo,
        resposta: req.body.resposta
      })

      res.status(HttpStatusCode.created).json(newResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const permissions = req.user.permissoes.processo_read

      const query = permissions === 'owned' ? { userId: req.user.id } : {}

      const resources = await ProcessoService.getAll(query)

      return res.send(resources)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  readById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.processo_read

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const resource = await ProcessoService.getById(Number(id))

      res.json(resource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body

      const permission = req.user.permissoes.processo_update

      checkPermissionResource(permission, req)

      if (!data || !isNumber(id)) {
        throw new BadRequestError()
      }

      const updatedResource = await ProcessoService.update(Number(id), data)

      res.json(updatedResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.process_delete

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const deletedResource = await ProcessoService.destroy(Number(id))

      res.json(deletedResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
