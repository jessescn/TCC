export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB')
}

export const formatISODate = (date?: string) => {
  return date ? new Date(date).toISOString().slice(0, 10) : ''
}

export const formatISODateToLocalTime = (date?: string) => {
  return date ? new Date(date).toISOString().slice(0, 16) : ''
}

export const removeAccents = (value: string) => {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
