import { format } from 'date-fns'

export const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy hh:mm a')
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

export const buildQuery = (obj: any) => {
  let query = ''

  Object.keys(obj).forEach(key => {
    const value = obj[key]

    if (Array.isArray(value)) {
      value.forEach(v => {
        if (v !== null && v !== undefined) {
          query += `&${key}=${v}`
        }
      })
    } else {
      if (value !== null && value !== undefined) {
        query += `&${key}=${value}`
      }
    }
  })

  return query.substring(1)
}
