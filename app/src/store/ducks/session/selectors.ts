import { createSelector } from '@reduxjs/toolkit'

import { State } from '..'

export const getRoot = (state: State) => {
  return state.session
}

export const getHasAuth = createSelector([getRoot], state => {
  return state.user !== null
})
