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

export const extract = (beg: string, end: string) => {
  const matcher = new RegExp(`${beg}(.*?)${end}`, 'gm')
  const normalise = (str: string) => str.slice(beg.length, end.length * -1)
  return function (str: any): string[] {
    return (str.match(matcher) || []).map(normalise)
  }
}
