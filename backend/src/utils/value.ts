import { Pagination } from 'repositories'

export const isNumber = (value: any) => {
  if (value === null || value === undefined) return false

  return !isNaN(Number(value))
}

export const paginateList = <T>(list: T[], pagination: Pagination) => {
  const end = pagination.per_page * pagination.page
  const start = end - pagination.per_page

  return list.slice(start, end)
}
