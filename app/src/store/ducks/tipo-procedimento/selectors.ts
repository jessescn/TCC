import { TipoProcedimento } from 'domain/entity/tipo-procedimento'
import { createSelector } from '@reduxjs/toolkit'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { State } from '..'
import { searchByKeys } from 'utils/search'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'

export const getRoot = (state: State) => {
  return state.tipoProcedimento
}

export const isLoadingContent = createSelector([getRoot], state => {
  return state.status === 'loading' || state.statusUpdate === 'loading'
})

export const getTipoProcedimentos = createSelector([getRoot], state => {
  return state.tipoProcedimentos
})

export const getPagination = createSelector([getRoot], state => {
  return state.pagination
})

export const getTipoProcedimento = createSelector(
  [getTipoProcedimentos],
  tipoProcedimentos => (id: number) => {
    return tipoProcedimentos.find(tipo => tipo.id === id)
  }
)

export const getTipoProcedimentosAbertos = createSelector(
  [getTipoProcedimentos],
  tipoProcedimentos => {
    return TipoProcedimento.getTipoProcedimentosAbertos(tipoProcedimentos)
  }
)

export const getTipoProcedimentoByProcedimento = createSelector(
  [getTipoProcedimentos],
  tipoProcedimentos => (procedimento?: ProcedimentoModel) => {
    if (!procedimento) {
      return
    }

    return tipoProcedimentos.find(tipo => tipo.id === procedimento.id)
  }
)

export const getTipoProcedimentosBySearch = createSelector(
  [getTipoProcedimentos],
  tipos => {
    return (search: string) =>
      tipos.filter(tipo =>
        searchByKeys<TipoProcedimentoModel>(
          tipo,
          ['nome', 'id', 'status'],
          search
        )
      )
  }
)
