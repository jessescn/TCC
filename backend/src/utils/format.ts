import { format } from 'date-fns'

export const formatISODate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy HH:mm')
}
