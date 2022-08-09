export const routesPermissionsMap = {
  token: {
    post: []
  },
  me: {
    get: []
  },
  users: {
    post: ['user_create'],
    get: ['user_read'],
    put: ['user_update'],
    delete: ['user_delete'],
    publicos: ['user_create'] // TESTE
  },
  formularios: {
    post: ['form_create'],
    get: ['form_read'],
    put: ['form_update'],
    delete: ['form_delete']
  },
  'tipo-procedimentos': {
    post: ['tipo_procedimento_create'],
    get: ['tipo_procedimento_read'],
    put: ['tipo_procedimento_update'],
    delete: ['tipo_procedimento_delete']
  },
  procedimentos: {
    post: ['procedimento_create'],
    get: ['procedimento_read'],
    put: ['procedimento_update'],
    delete: ['procedimento_delete']
  },
  colegiado: {
    vote: ['colegiado_vote'],
    deleteVote: ['colegiado_delete_vote'],
    comments: ['colegiado_comments']
  },
  comentarios: {
    post: ['comentario_create'],
    get: ['comentario_read'],
    put: ['comentario_update'],
    delete: ['comentario_delete']
  }
}
