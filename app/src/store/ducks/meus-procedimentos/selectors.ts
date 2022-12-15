import { createSelector } from '@reduxjs/toolkit'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.meusProcedimentos
}

export const isLoadingContent = createSelector([getRoot], state => {
  return state.status === 'loading'
})

export const getProcedimentos = createSelector([getRoot], state => {
  return state.procedimentos
})

export const getPagination = createSelector([getRoot], state => {
  return state.pagination
})
