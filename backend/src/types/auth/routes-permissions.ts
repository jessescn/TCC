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
  forms: {
    post: ['form_create'],
    get: ['form_read'],
    put: ['form_update'],
    delete: ['form_delete']
  },
  processos: {
    post: ['process_create'],
    get: ['process_read'],
    put: ['process_update'],
    delete: ['process_delete']
  },
  comentarios: {
    post: ['comment_create'],
    get: ['comment_read'],
    put: ['comment_update'],
    delete: ['comment_delete']
  }
}
