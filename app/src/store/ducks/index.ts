import { all } from 'redux-saga/effects'

import * as sessionSlice from './session'
import * as userSlice from './user'
import * as tipoProcedimentoSlice from './tipo-procedimento'
import * as tipoProcedimentoDetalhesSlice from './tipo-procedimento/detalhes'
import * as procedimentoDetalhesSlice from './procedimento/detalhes'

import * as formularioSlice from './formulario'
import * as procedimentoSlice from './procedimento'
import * as colegiadoSlice from './colegiado'
import * as meusProcedimentosSlice from './meus-procedimentos'

export type State = {
  session: sessionSlice.State
  user: userSlice.State
  procedimento: procedimentoSlice.State
  tipoProcedimento: tipoProcedimentoSlice.State
  tipoProcedimentoDetalhes: tipoProcedimentoDetalhesSlice.State
  procedimentoDetalhes: procedimentoDetalhesSlice.State
  formulario: formularioSlice.State
  meusProcedimentos: meusProcedimentosSlice.State
  colegiado: colegiadoSlice.State
}

export const reducer = {
  session: sessionSlice.reducer,
  user: userSlice.reducer,
  tipoProcedimento: tipoProcedimentoSlice.reducer,
  tipoProcedimentoDetalhes: tipoProcedimentoDetalhesSlice.reducer,
  procedimentoDetalhes: procedimentoDetalhesSlice.reducer,
  formulario: formularioSlice.reducer,
  procedimento: procedimentoSlice.reducer,
  meusProcedimentos: meusProcedimentosSlice.reducer,
  colegiado: colegiadoSlice.reducer
}

export const actions = Object.freeze({
  session: sessionSlice.actions,
  user: userSlice.actions,
  tipoProcedimento: tipoProcedimentoSlice.actions,
  tipoProcedimentoDetalhes: tipoProcedimentoDetalhesSlice.actions,
  procedimentoDetalhes: procedimentoDetalhesSlice.actions,
  formulario: formularioSlice.actions,
  procedimento: procedimentoSlice.actions,
  meusProcedimentos: meusProcedimentosSlice.actions,
  colegiado: colegiadoSlice.actions
})

export const selectors = Object.freeze({
  session: sessionSlice.selectors,
  procedimento: procedimentoSlice.selectors,
  user: userSlice.selectors,
  tipoProcedimento: tipoProcedimentoSlice.selectors,
  tipoProcedimentoDetalhes: tipoProcedimentoDetalhesSlice.selectors,
  procedimentoDetalhes: procedimentoDetalhesSlice.selectors,
  formulario: formularioSlice.selectors,
  meusProcedimentos: meusProcedimentosSlice.selectors,
  colegiado: colegiadoSlice.selectors
})

export const sagas = function* () {
  yield all([
    ...sessionSlice.sagas,
    ...userSlice.sagas,
    ...tipoProcedimentoSlice.sagas,
    ...formularioSlice.sagas,
    ...procedimentoSlice.sagas,
    ...meusProcedimentosSlice.sagas,
    ...colegiadoSlice.sagas,
    ...tipoProcedimentoDetalhesSlice.sagas,
    ...procedimentoDetalhesSlice.sagas
  ])
}
