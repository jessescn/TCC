import { TipoProcesso } from 'domain/entity/tipo-processo'
import { createSelector } from '@reduxjs/toolkit'
import { ProcessoModel } from 'domain/models/processo'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.tipoProcesso
}

export const getTipoProcessos = createSelector([getRoot], state => {
  return state.tipoProcessos
})

export const getTipoProcesso = createSelector(
  [getTipoProcessos],
  tipoProcessos => (id: number) => {
    return tipoProcessos.find(tipo => tipo.id === id)
  }
)

export const getTipoProcessosAbertos = createSelector(
  [getTipoProcessos],
  tipoProcessos => {
    return TipoProcesso.getTipoProcessosAbertos(tipoProcessos)
  }
)

export const getTipoProcessoByProcesso = createSelector(
  [getTipoProcessos],
  tipoProcessos => (processo?: ProcessoModel) => {
    if (!processo) {
      return
    }

    return tipoProcessos.find(tipo => tipo.id === processo.id)
  }
)

export const getTipoProcessosBySearch = createSelector(
  [getTipoProcessos],
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
