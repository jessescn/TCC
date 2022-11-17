import { createSelector } from '@reduxjs/toolkit'
import { State } from '../..'

export const getRoot = (state: State) => {
  return state.formularioDetalhes
}

export const getFormulario = createSelector([getRoot], state => {
  return state.formulario
})

export const getFormularios = createSelector([getRoot], state => {
  return state.formularios
})
