import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  ProcedimentoDetails,
  ProcedimentoService
} from 'services/procedimentos'
import { actions } from './slice'

export const sagas = [takeLatest(actions.getInfo.type, getInfoSaga)]

function* getInfoSaga(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<ProcedimentoDetails> = yield call(() =>
      ProcedimentoService.details(action.payload)
    )

    console.log({ response })

    yield put(actions.getInfoSuccess(response.data))
  } catch (error) {
    yield put(actions.getInfoFailure())
  }
}
