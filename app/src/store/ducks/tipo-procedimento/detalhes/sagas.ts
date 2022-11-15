import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  TipoProcedimentoDetails,
  TipoProcedimentoService
} from 'services/tipo-procedimentos'
import { actions } from './slice'

export const sagas = [takeLatest(actions.getInfo.type, getInfoSaga)]

function* getInfoSaga(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<TipoProcedimentoDetails> = yield call(() =>
      TipoProcedimentoService.details(action.payload)
    )

    yield put(actions.getInfoSuccess(response.data))
  } catch (error) {
    yield put(actions.getInfoFailure())
  }
}
