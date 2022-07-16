import { createSelector } from '@reduxjs/toolkit'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.tipoProcesso
}

export const getTipoProcessos = createSelector([getRoot], state => {
  return state.tipoProcessos
})

export const getTipoProcessoById = createSelector(
  [getTipoProcessos],
  tipos => (id: number) => {
    return tipos.find(tipo => tipo.id === id)
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
