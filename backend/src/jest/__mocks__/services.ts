export const mockServiceCreate = (service: any, value: any) => {
  return jest.spyOn(service, 'create').mockResolvedValue(value)
}

export const mockServiceUpdate = (service: any, value: any) => {
  return jest.spyOn(service, 'update').mockResolvedValue(value)
}

export const mockServiceDestroy = (service: any, value: any) => {
  return jest.spyOn(service, 'destroy').mockResolvedValue(value)
}

export const mockServiceGetAll = (service: any, value: any) => {
  return jest.spyOn(service, 'getAll').mockResolvedValue(value)
}

export const mockServiceGetById = (service: any, value: any) => {
  return jest.spyOn(service, 'getById').mockResolvedValue(value)
}
