export const mockFindAll = (model: any, data: any[] = []) => {
  return jest.spyOn(model, 'findAll').mockResolvedValue(data)
}

export const mockFindByPk = (model: any, data: any = null) => {
  return jest.spyOn(model, 'findByPk').mockResolvedValue(data)
}

export const mockFindOne = (model: any, data: any = null) => {
  return jest.spyOn(model, 'findOne').mockResolvedValue(data)
}

export const mockCreate = (model: any, data: any = null) => {
  return jest.spyOn(model, 'create').mockResolvedValue(data)
}
