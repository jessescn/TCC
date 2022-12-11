import { addHours, format } from 'date-fns'

export const formatISODateToLocalTime = (date?: string) => {
  const timezone = format(new Date(), 'x')

  return date
    ? addHours(new Date(date), Number(timezone)).toISOString().slice(0, 16)
    : ''
}

export const formatISODate = (date: string) => {
  const timeDate = formatISODateToLocalTime(date)
  return format(new Date(timeDate), 'dd/MM/yyyy HH:mm')
}
