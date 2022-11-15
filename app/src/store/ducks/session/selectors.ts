import { createSelector } from '@reduxjs/toolkit'
import { ProfileType } from 'domain/types/actors'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.session
}

export const getCurrentUser = createSelector([getRoot], state => {
  return state.currentUser
})

export const getAuthStatus = createSelector([getRoot], state => {
  return state.loginStatus
})

export const getOpenProcedimentos = createSelector([getRoot], state => {
  return state.openProcedimentos
})

export const is = createSelector(
  [getCurrentUser],
  currentUser => (profile: ProfileType) => {
    return currentUser?.profile.nome === profile
  }
)
