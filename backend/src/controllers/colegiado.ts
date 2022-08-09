import { checkPermissionResource, errorResponseHandler } from 'controllers'
import { VotoProcedimento } from 'models/procedimento'
import { ComentarioService } from 'services/entities/comentario-service'
import { ProcedimentoService } from 'services/entities/procedimento-service'
import { Request, Response } from 'types/express'
import { BadRequestError, UnauthorizedError } from 'types/express/errors'
import { isNumber } from 'utils/value'

type RemoteDeleteVote = {
  autor: number
}

export const ColegiadoController = {
  vote: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data: VotoProcedimento = req.body

      const permission = req.user.permissoes.colegiado_vote

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      if (permission === 'owned' && data.autor !== req.user.id) {
        throw new UnauthorizedError(
          'You only have permission to vote for yourself.'
        )
      }

      const procedimento = await ProcedimentoService.vote(Number(id), data)

      res.json(procedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  deleteVote: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { autor }: RemoteDeleteVote = req.body

      const permission = req.user.permissoes.colegiado_delete_vote

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      if (permission === 'owned' && autor !== req.user.id) {
        throw new UnauthorizedError(
          'You only have permission to delete your votes.'
        )
      }

      const procedimento = await ProcedimentoService.removeVote(
        Number(id),
        req.body.autor
      )

      res.json(procedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  comments: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.colegiado_comments

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const comentarios = await ComentarioService.getAll({ procedimentoId: id })

      res.json(comentarios)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
