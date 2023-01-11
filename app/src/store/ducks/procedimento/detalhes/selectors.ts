import { createSelector } from '@reduxjs/toolkit'
import { State } from '../..'

export const getRoot = (state: State) => {
  return state.procedimentoDetalhes
}

export const isLoadingContent = createSelector([getRoot], state => {
  return state.statusFetch === 'loading'
})

export const getProcedimento = createSelector([getRoot], state => {
  return state.procedimento
})

export const getFormularios = createSelector([getRoot], state => {
  return state.formularios
})

export const getComentarios = createSelector([getRoot], state => {
  return state.comentarios
})

export const isComentarioSidebarOpen = createSelector([getRoot], state => {
  return state.showComments
})

export const isFormularioExpanded = createSelector([getRoot], state => {
  return state.showFormulario
})
