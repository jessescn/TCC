import { all } from 'redux-saga/effects'

import * as sessionSlice from './session'

export type State = {
  session: sessionSlice.State
}

export const reducer = {
  session: sessionSlice.reducer
}

export const actions = Object.freeze({
  session: sessionSlice.actions
})

export const selectors = Object.freeze({
  session: sessionSlice.selectors
})

export const sagas = function* () {
  yield all([
    // ...sessionSlice.sagas
  ])
}
