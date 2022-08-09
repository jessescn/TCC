import { UserModel } from './user'

export interface ComentarioModel {
  id: number
  conteudo: string
  user: UserModel
  createdAt: string
}

export interface NewComentario {
  conteudo: string
  procedimento: number
}
