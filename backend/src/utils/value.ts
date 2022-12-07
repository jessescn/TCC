import { ProcedimentoModel } from 'domain/models/procedimento'
import { Pagination } from 'repositories'

export const isNumber = (value: any) => {
  if (value === null || value === undefined) return false

  return !isNaN(Number(value))
}

export const getCurrentTStatus = (procedimento: ProcedimentoModel) => {
  if (procedimento.status.length === 0) return

  return procedimento.status[procedimento.status.length - 1]
}

export const getCurrentStatus = (procedimento: ProcedimentoModel) => {
  const tstatus = getCurrentTStatus(procedimento)

  return tstatus?.status
}

export const paginateList = <T>(list: T[], pagination: Pagination) => {
  const end = pagination.per_page * pagination.page
  const start = end - pagination.per_page

  return list.slice(start, end)
}
