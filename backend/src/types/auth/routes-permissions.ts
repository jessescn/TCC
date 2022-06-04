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
  process: {
    post: ['process_create'],
    get: ['process_read'],
    put: ['process_update'],
    delete: ['process_delete']
  }
}
