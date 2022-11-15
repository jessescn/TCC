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

export const getFormulariosFromTipo = createSelector(
  [getFormularios, getTipoProcedimento],
  (formularios, tipoProcedimento) => {
    const formularioIds = tipoProcedimento?.formularios || []

    return formularios.filter(formulario =>
      formularioIds.includes(formulario.id)
    )
  }
)

export const getPublicos = createSelector([getRoot], state => {
  return state.publicos
})
