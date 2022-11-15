import { createSelector } from '@reduxjs/toolkit'
import { State } from '../..'

export const getRoot = (state: State) => {
  return state.procedimentoDetalhes
}

export const getProcedimento = createSelector([getRoot], state => {
  return state.procedimento
})

export const getFormularios = createSelector([getRoot], state => {
  return state.formularios
})
