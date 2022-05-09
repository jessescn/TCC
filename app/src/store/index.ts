import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as reduxDispatch,
  useSelector as reduxSelector
} from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { reducer, sagas } from './ducks'
// import { authMiddleware } from './middlewares/authMiddleware'
export { actions, selectors } from './ducks'

const sagaMiddleware = createSagaMiddleware()

// const middlewares = [authMiddleware, sagaMiddleware]
const middlewares = [sagaMiddleware]

const middlewareOptions = { thunk: false, serializableCheck: false }

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware(middlewareOptions).concat(middlewares),
  devTools: process.env.APP_NAME !== 'production'
})

sagaMiddleware.run(sagas)

export type TRootState = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch

export const useDispatch = (): TDispatch => reduxDispatch<TDispatch>()

export const useSelector = <T>(selector: (state: TRootState) => T) =>
  reduxSelector<TRootState, T>(selector)
