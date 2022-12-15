import { createSelector } from '@reduxjs/toolkit'
import { State } from '../..'

export const getRoot = (state: State) => {
  return state.formularioDetalhes
}

export const isLoadingContent = createSelector([getRoot], state => {
  return state.statusFetch === 'loading'
})

export const getFormulario = createSelector([getRoot], state => {
  return state.formulario
})

export const getFormularios = createSelector([getRoot], state => {
  return state.formularios
})
