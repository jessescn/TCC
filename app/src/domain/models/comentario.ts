import { UserModel } from './user'

export interface ComentarioModel {
  id: number
  conteudo: string
  actor?: UserModel
  createdAt: string
  createdBy: number
}

export interface NewComentario {
  conteudo: string
  procedimento: number
}
