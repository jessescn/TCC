export type Roles = 'usuario' | 'admin' | 'coordenacao' | 'colegiado'

export const Admin = {
  user_create: 'all',
  user_read: 'all',
  user_update: 'all',
  user_delete: 'all',
  user_publicos: 'all',

  form_create: 'all',
  form_read: 'all',
  form_update: 'all',
  form_delete: 'all',

  processo_create: 'all',
  processo_read: 'all',
  processo_update: 'all',
  processo_delete: 'all',
  processo_vote: 'all',
  processo_status: 'all',
  processo_homologacao: 'all',
  processo_comentarios: 'all',
  processo_delete_vote: 'all',

  tipo_processo_create: 'all',
  tipo_processo_read: 'all',
  tipo_processo_update: 'all',
  tipo_processo_delete: 'all',

  comentario_create: 'all',
  comentario_read: 'all',
  comentario_update: 'all',
  comentario_delete: 'all'
}

export type PermissionKeys = Record<
  keyof typeof Admin,
  'owned' | 'all' | 'not_allowed'
>

export const Default: PermissionKeys = {
  user_create: 'all',
  user_publicos: 'all',
  user_read: 'owned',
  user_update: 'owned',
  user_delete: 'not_allowed',

  form_create: 'owned',
  form_read: 'owned',
  form_update: 'owned',
  form_delete: 'owned',

  processo_create: 'owned',
  processo_read: 'owned',
  processo_update: 'owned',
  processo_delete: 'owned',
  processo_vote: 'not_allowed',
  processo_delete_vote: 'not_allowed',
  processo_status: 'not_allowed',
  processo_homologacao: 'not_allowed',
  processo_comentarios: 'not_allowed',

  tipo_processo_create: 'owned',
  tipo_processo_read: 'owned',
  tipo_processo_update: 'owned',
  tipo_processo_delete: 'owned',

  comentario_create: 'owned',
  comentario_read: 'owned',
  comentario_update: 'owned',
  comentario_delete: 'owned'
}
