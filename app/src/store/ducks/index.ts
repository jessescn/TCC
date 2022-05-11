import { all } from 'redux-saga/effects'

import * as sessionSlice from './session'
import * as userSlice from './user'

export type State = {
  session: sessionSlice.State
  user: userSlice.State
}

export const reducer = {
  session: sessionSlice.reducer,
  user: userSlice.reducer
}

export const actions = Object.freeze({
  session: sessionSlice.actions,
  user: userSlice.actions
})

export const selectors = Object.freeze({
  session: sessionSlice.selectors,
  user: userSlice.selectors
})

export const sagas = function* () {
  yield all([...sessionSlice.sagas, ...userSlice.sagas])
}
