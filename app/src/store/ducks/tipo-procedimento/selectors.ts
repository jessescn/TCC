import { TipoProcedimento } from 'domain/entity/tipo-procedimento'
import { createSelector } from '@reduxjs/toolkit'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.tipoProcedimento
}

export const getTipoProcedimentos = createSelector([getRoot], state => {
  return state.tipoProcedimentos
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
      tipos.filter(tipo => {
        if (search.localeCompare(String(tipo.id)) === 0) return true

        if (search.includes(tipo.status)) return true

        const terms = search.split(' ')
        let includes = false

        terms.forEach(term => {
          if (tipo.nome.includes(term)) {
            includes = true
          }
        })

        return includes
      })
  }
)
