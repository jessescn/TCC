import { all } from 'redux-saga/effects'

import * as sessionSlice from './session'
import * as userSlice from './user'
import * as tipoProcedimentoSlice from './tipo-procedimento'
import * as formularioSlice from './formulario'
import * as procedimentoSlice from './procedimento'
import * as meusProcedimentosSlice from './meus-procedimentos'

export type State = {
  session: sessionSlice.State
  user: userSlice.State
  procedimento: procedimentoSlice.State
  tipoProcedimento: tipoProcedimentoSlice.State
  formulario: formularioSlice.State
  meusProcedimentos: meusProcedimentosSlice.State
}

export const reducer = {
  session: sessionSlice.reducer,
  user: userSlice.reducer,
  tipoProcedimento: tipoProcedimentoSlice.reducer,
  formulario: formularioSlice.reducer,
  procedimento: procedimentoSlice.reducer,
  meusProcedimentos: meusProcedimentosSlice.reducer
}

export const actions = Object.freeze({
  session: sessionSlice.actions,
  user: userSlice.actions,
  tipoProcedimento: tipoProcedimentoSlice.actions,
  formulario: formularioSlice.actions,
  procedimento: procedimentoSlice.actions,
  meusProcedimentos: meusProcedimentosSlice.actions
})

export const selectors = Object.freeze({
  session: sessionSlice.selectors,
  procedimento: procedimentoSlice.selectors,
  user: userSlice.selectors,
  tipoProcedimento: tipoProcedimentoSlice.selectors,
  formulario: formularioSlice.selectors,
  meusProcedimentos: meusProcedimentosSlice.selectors
})

export const sagas = function* () {
  yield all([
    ...sessionSlice.sagas,
    ...userSlice.sagas,
    ...tipoProcedimentoSlice.sagas,
    ...formularioSlice.sagas,
    ...procedimentoSlice.sagas,
    ...meusProcedimentosSlice.sagas
  ])
}
