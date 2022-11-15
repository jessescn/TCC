import { createSelector } from '@reduxjs/toolkit'
import { State } from '../..'

export const getRoot = (state: State) => {
  return state.tipoProcedimentoDetalhes
}

export const getTipoProcedimento = createSelector([getRoot], state => {
  return state.tipoProcedimento
})

export const getFormularios = createSelector([getRoot], state => {
  return state.formularios
})

export const getPublicos = createSelector([getRoot], state => {
  return state.publicos
})
