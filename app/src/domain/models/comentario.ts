import { UserModel } from './user'

export interface ComentarioModel {
  id: number
  conteudo: string
  comentarioMae?: number
  user: UserModel
  comentarios: ComentarioModel[]
}

export interface NewComentario {
  conteudo: string
  processo: number
}
