import { createSelector } from '@reduxjs/toolkit'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.analiseDados
}

// export const getConfiguration = createSelector([getRoot], state => {
//   return {
//     formulario: state.formulario,
//     tipoProcedimento: state.tipoProcedimento
//   }
// })
