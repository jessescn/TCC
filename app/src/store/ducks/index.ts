import { all } from 'redux-saga/effects'

import * as sessionSlice from './session'
import * as userSlice from './user'
import * as userDetalhesSlice from './user/detalhes'
import * as tipoProcedimentoSlice from './tipo-procedimento'
import * as tipoProcedimentoDetalhesSlice from './tipo-procedimento/detalhes'
import * as procedimentoDetalhesSlice from './procedimento/detalhes'

import * as formularioSlice from './formulario'
import * as formularioDetalhesSlice from './formulario/detalhes'
import * as procedimentoSlice from './procedimento'
import * as colegiadoSlice from './colegiado'
import * as meusProcedimentosSlice from './meus-procedimentos'
import * as analiseDadosSlice from './analise-dados'

export type State = {
  session: sessionSlice.State
  user: userSlice.State
  userDetalhes: userDetalhesSlice.State
  procedimento: procedimentoSlice.State
  tipoProcedimento: tipoProcedimentoSlice.State
  tipoProcedimentoDetalhes: tipoProcedimentoDetalhesSlice.State
  procedimentoDetalhes: procedimentoDetalhesSlice.State
  formulario: formularioSlice.State
  formularioDetalhes: formularioDetalhesSlice.State
  meusProcedimentos: meusProcedimentosSlice.State
  colegiado: colegiadoSlice.State
  analiseDados: analiseDadosSlice.State
}

export const reducer = {
  session: sessionSlice.reducer,
  user: userSlice.reducer,
  userDetalhes: userDetalhesSlice.reducer,
  tipoProcedimento: tipoProcedimentoSlice.reducer,
  tipoProcedimentoDetalhes: tipoProcedimentoDetalhesSlice.reducer,
  procedimentoDetalhes: procedimentoDetalhesSlice.reducer,
  formulario: formularioSlice.reducer,
  formularioDetalhes: formularioDetalhesSlice.reducer,
  procedimento: procedimentoSlice.reducer,
  meusProcedimentos: meusProcedimentosSlice.reducer,
  colegiado: colegiadoSlice.reducer,
  analiseDados: analiseDadosSlice.reducer
}

export const actions = Object.freeze({
  session: sessionSlice.actions,
  user: userSlice.actions,
  userDetalhes: userDetalhesSlice.actions,
  tipoProcedimento: tipoProcedimentoSlice.actions,
  tipoProcedimentoDetalhes: tipoProcedimentoDetalhesSlice.actions,
  procedimentoDetalhes: procedimentoDetalhesSlice.actions,
  formulario: formularioSlice.actions,
  formularioDetalhes: formularioDetalhesSlice.actions,
  procedimento: procedimentoSlice.actions,
  meusProcedimentos: meusProcedimentosSlice.actions,
  colegiado: colegiadoSlice.actions,
  analiseDados: analiseDadosSlice.actions
})

export const selectors = Object.freeze({
  session: sessionSlice.selectors,
  procedimento: procedimentoSlice.selectors,
  user: userSlice.selectors,
  userDetalhes: userDetalhesSlice.selectors,
  tipoProcedimento: tipoProcedimentoSlice.selectors,
  tipoProcedimentoDetalhes: tipoProcedimentoDetalhesSlice.selectors,
  procedimentoDetalhes: procedimentoDetalhesSlice.selectors,
  formulario: formularioSlice.selectors,
  formularioDetalhes: formularioDetalhesSlice.selectors,
  meusProcedimentos: meusProcedimentosSlice.selectors,
  colegiado: colegiadoSlice.selectors,
  analiseDados: analiseDadosSlice.selectors
})

export const sagas = function* () {
  yield all([
    ...sessionSlice.sagas,
    ...userSlice.sagas,
    ...userDetalhesSlice.sagas,
    ...tipoProcedimentoSlice.sagas,
    ...formularioSlice.sagas,
    ...procedimentoSlice.sagas,
    ...meusProcedimentosSlice.sagas,
    ...colegiadoSlice.sagas,
    ...tipoProcedimentoDetalhesSlice.sagas,
    ...procedimentoDetalhesSlice.sagas,
    ...formularioDetalhesSlice.sagas,
    ...analiseDadosSlice.sagas
  ])
}
