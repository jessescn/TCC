import { all } from 'redux-saga/effects'

import * as sessionSlice from './session'
import * as userSlice from './user'
import * as formSlice from './form'

export type State = {
  session: sessionSlice.State
  user: userSlice.State
  form: formSlice.State
}

export const reducer = {
  session: sessionSlice.reducer,
  user: userSlice.reducer,
  form: formSlice.reducer
}

export const actions = Object.freeze({
  session: sessionSlice.actions,
  user: userSlice.actions,
  form: formSlice.actions
})

export const selectors = Object.freeze({
  session: sessionSlice.selectors,
  user: userSlice.selectors,
  form: formSlice.selectors
})

export const sagas = function* () {
  yield all([...sessionSlice.sagas, ...userSlice.sagas, ...formSlice.sagas])
}
