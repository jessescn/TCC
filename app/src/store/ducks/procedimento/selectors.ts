import { createSelector } from '@reduxjs/toolkit'
import { Procedimento } from 'domain/entity/procedimento'
import { getCurrentStatus } from 'utils/procedimento'
import { State } from '..'
import { getCurrentUser } from '../session/selectors'

export const getRoot = (state: State) => {
  return state.procedimento
}

export const getProcedimentos = createSelector([getRoot], state => {
  return state.procedimentos
})

export const getProcedimentoById = createSelector(
  [getProcedimentos],
  Procedimentos => (id: number) => {
    return Procedimentos.find(Procedimento => Procedimento.id === id)
  }
)

export const getMeusProcedimentos = createSelector(
  [getCurrentUser, getProcedimentos],
  (currentUser, Procedimentos) => {
    if (!currentUser) {
      return []
    }

    return Procedimento.filterByCreatedBy(Procedimentos, currentUser.id)
  }
)

export const getProcedimentosEmHomologacao = createSelector(
  [getProcedimentos],
  Procedimentos => {
    return Procedimentos.filter(Procedimento => {
      const lastStatus = getCurrentStatus(Procedimento)

      return lastStatus === 'em_homologacao'
    })
  }
)

export const getProcedimentosEmHomologacaoBySearch = createSelector(
  [getProcedimentosEmHomologacao],
  Procedimentos => {
    return (search: string) => Procedimento.search(Procedimentos, search)
  }
)

export const getMeusProcedimentosBySearch = createSelector(
  [getMeusProcedimentos],
  Procedimentos => {
    return (search: string) => Procedimento.search(Procedimentos, search)
  }
)

export const getProcedimentosBySearch = createSelector(
  [getProcedimentos],
  Procedimentos => {
    return (search: string) => Procedimento.search(Procedimentos, search)
  }
)
