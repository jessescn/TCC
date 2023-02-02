import { Pagination } from 'repositories'

export const isNumber = (value: any) => {
  if (value === null || value === undefined) return false

  return !isNaN(Number(value))
}

export const paginateList = <T>(list: T[], pag?: Pagination) => {
  const defaultPagination: Pagination = { page: 1, per_page: 10000, term: null }
  const pagination = pag || defaultPagination
  const end = pagination?.per_page * pagination.page
  const start = end - pagination.per_page

  return list.slice(start, end)
}
