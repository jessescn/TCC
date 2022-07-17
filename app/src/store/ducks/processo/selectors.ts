import { createSelector } from '@reduxjs/toolkit'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.processo
}

export const getProcessos = createSelector([getRoot], state => {
  return state.processos
})

export const getProcessoById = createSelector(
  [getProcessos],
  processos => (id: number) => {
    return processos.find(processo => processo.id === id)
  }
)

export const getProcessosBySearch = createSelector(
  [getProcessos],
  processos => {
    return (search: string) => {
      if (search.trim().length === 0) {
        return processos
      }

      return processos.filter(processo => {
        if (search.localeCompare(String(processo.id)) === 0) return true

        if (search.includes(processo.status)) return true

        const terms = search.split(' ')
        let includes = false

        terms.forEach(term => {
          if (processo.tipo_processo?.nome.includes(term)) {
            includes = true
          }
        })

        return includes
      })
    }
  }
)
