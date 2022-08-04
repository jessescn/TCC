export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB')
}

export const formatISODate = (date?: string) => {
  return date ? new Date(date).toISOString().slice(0, 10) : ''
}
