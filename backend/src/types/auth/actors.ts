export type Roles = 'usuario' | 'admin' | 'coordenacao' | 'colegiado'

export const Admin = {
  user_create: 'all', ///
  user_read: 'all',
  user_update: 'all',
  user_delete: 'all',
  user_publicos: 'all',

  form_create: 'all',
  form_read: 'all',
  form_update: 'all',
  form_delete: 'all',

  procedimento_create: 'all',
  procedimento_read: 'all',
  procedimento_update: 'all',
  procedimento_delete: 'all',
  procedimento_status: 'all',
  procedimento_homologacao: 'all',

  colegiado_vote: 'all',
  colegiado_delete_vote: 'all',
  colegiado_comments: 'all',

  tipo_procedimento_create: 'all',
  tipo_procedimento_read: 'all',
  tipo_procedimento_update: 'all',
  tipo_procedimento_delete: 'all',

  comentario_create: 'all',
  comentario_read: 'all',
  comentario_update: 'all',
  comentario_delete: 'all'
}

export type PermissionScope = 'owned' | 'all' | 'not_allowed'

export type PermissionKeys = Record<keyof typeof Admin, PermissionScope>

export const Default: PermissionKeys = {
  user_create: 'all', // se cadastrar
  user_publicos: 'not_allowed', // visualizar todos os publicos
  user_read: 'owned', // somente pode ler sobre seu próprio usuario
  user_update: 'owned', // somente pode editar seu próprio usuário
  user_delete: 'not_allowed', // não pode remover usuario

  form_create: 'not_allowed', // não pode criar formulário
  form_read: 'not_allowed', // não pode ler os formulários
  form_update: 'not_allowed', // não pode editar um formulário
  form_delete: 'not_allowed', // não pode remover um formulário

  procedimento_create: 'owned', // pode criar apenas procedimentos que ele tem acesso pelo público no tipo
  procedimento_read: 'owned', // pode ler apenas seus próprios procedimentos
  procedimento_update: 'owned', // pode editar apenas seus próprios procedimentos
  procedimento_delete: 'not_allowed', // não pode remover um procedimento
  procedimento_status: 'not_allowed', // não pode alterar o status diretamente de um procedimento
  procedimento_homologacao: 'not_allowed', // não pode deferir um procedimento

  colegiado_vote: 'not_allowed', // não pode votar
  colegiado_delete_vote: 'not_allowed', // não pode remover um voto
  colegiado_comments: 'not_allowed', // não pode comentar em um procedimento

  tipo_procedimento_create: 'not_allowed', // não pode criar um tipo_procedimento
  tipo_procedimento_read: 'not_allowed', // não pode ler um tipo_procedimento
  tipo_procedimento_update: 'not_allowed', // não pode editar um tipo_procedimento
  tipo_procedimento_delete: 'not_allowed', // não pode remover um tipo_procedimento

  comentario_create: 'not_allowed', // não pode criar um comentario
  comentario_read: 'not_allowed', // não pode criar um comentario
  comentario_update: 'not_allowed', // não pode criar um comentario
  comentario_delete: 'not_allowed' // não pode criar um comentario
}
