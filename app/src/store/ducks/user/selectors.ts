import { createSelector } from '@reduxjs/toolkit'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.user
}

export const getStatusCreate = createSelector([getRoot], state => {
  return state.statusCreate
})

export const getTotal = createSelector([getRoot], state => {
  return state.total
})

export const getUsuarios = createSelector([getRoot], state => {
  return state.usuarios
})

export const getPagination = createSelector([getRoot], state => {
  return state.pagination
})
