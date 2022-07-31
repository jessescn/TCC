import { createSelector } from '@reduxjs/toolkit'
import { Roles } from 'domain/types/actors'
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

export const is = createSelector(
  [getCurrentUser],
  currentUser => (role: Roles) => {
    return currentUser?.roles.includes(role)
  }
)
