import { createSelector } from '@reduxjs/toolkit'
import { State } from '../..'
import { getCurrentUser } from '../../session/selectors'

export const getRoot = (state: State) => {
  return state.userDetalhes
}

export const isLoadingContent = createSelector([getRoot], state => {
  return state.statusFetch === 'loading'
})

export const getUsuario = createSelector([getRoot], state => {
  return state.usuario
})

export const getProfiles = createSelector([getRoot], state => {
  return state.profiles
})

export const getPublicos = createSelector([getRoot], state => {
  return state.publicos
})

export const canUpdateUsuario = createSelector(
  [getCurrentUser, getUsuario],
  (currentLoggedUser, userDetails) => {
    if (!currentLoggedUser || !userDetails) return false

    return currentLoggedUser.id !== userDetails.id
  }
)
