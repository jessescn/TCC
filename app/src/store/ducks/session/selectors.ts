import { createSelector } from '@reduxjs/toolkit'
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
