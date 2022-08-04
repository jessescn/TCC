import { createSelector } from '@reduxjs/toolkit'
import { Processo } from 'domain/entity/processo'
import { State } from '..'
import { getCurrentUser } from '../session/selectors'

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

export const getMeusProcessos = createSelector(
  [getCurrentUser, getProcessos],
  (currentUser, processos) => {
    if (!currentUser) {
      return []
    }

    return Processo.filterByCreatedBy(processos, currentUser.id)
  }
)

export const getProcessosEmHomologacao = createSelector(
  [getProcessos],
  processos => {
    return processos.filter(processo => {
      const lastStatus = processo.status[processo.status.length - 1]?.status

      return lastStatus === 'em_homologacao'
    })
  }
)

export const getProcessosEmHomologacaoBySearch = createSelector(
  [getProcessosEmHomologacao],
  processos => {
    return (search: string) => Processo.search(processos, search)
  }
)

export const getMeusProcessosBySearch = createSelector(
  [getMeusProcessos],
  processos => {
    return (search: string) => Processo.search(processos, search)
  }
)

export const getProcessosBySearch = createSelector(
  [getProcessos],
  processos => {
    return (search: string) => Processo.search(processos, search)
  }
)
