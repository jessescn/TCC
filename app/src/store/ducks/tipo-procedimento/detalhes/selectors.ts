import { createSelector } from '@reduxjs/toolkit'
import { State } from '../..'

export const getRoot = (state: State) => {
  return state.tipoProcedimentoDetalhes
}

export const getTipoProcedimento = createSelector([getRoot], state => {
  return state.tipoProcedimento
})
