import { createSelector } from '@reduxjs/toolkit'
import { State } from '../..'

export const getRoot = (state: State) => {
  return state.userDetalhes
}

export const getUsuario = createSelector([getRoot], state => {
  return state.usuario
})

export const getProfiles = createSelector([getRoot], state => {
  return state.profiles
})

export const getPublicos = createSelector([getRoot], state => {
  return state.publicos
})
