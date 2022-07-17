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
    delete: ['user_delete']
  },
  formularios: {
    post: ['form_create'],
    get: ['form_read'],
    put: ['form_update'],
    delete: ['form_delete']
  },
  'tipo-processos': {
    post: ['tipo_processo_create'],
    get: ['tipo_processo_read'],
    put: ['tipo_processo_update'],
    delete: ['tipo_processo_delete']
  },
  processos: {
    post: ['processo_create'],
    get: ['processo_read'],
    put: ['processo_update'],
    delete: ['processo_delete']
  },
  comentarios: {
    post: ['comentario_create'],
    get: ['comentario_read'],
    put: ['comentario_update'],
    delete: ['comentario_delete']
  }
}
