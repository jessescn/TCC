import { format, addHours } from 'date-fns'

type FormatDateOptions = {
  customFormat?: string
  ignoreTimezone?: boolean
}

export const formatDate = (date: string, options: FormatDateOptions = {}) => {
  const dt = new Date(date)
  const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)
  const formatString = options.customFormat || 'dd/MM/yyyy HH:mm'
  const dtToRender = options.ignoreTimezone ? dtDateOnly : dt
  return format(dtToRender, formatString)
}

export const formatISODate = (date?: string) => {
  return date ? new Date(date).toISOString().slice(0, 10) : ''
}

export const formatISODateToLocalTime = (date?: string) => {
  const timezone = format(new Date(), 'x')

  return date
    ? addHours(new Date(date), Number(timezone)).toISOString().slice(0, 16)
    : ''
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
