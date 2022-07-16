import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { call, put, takeLatest } from 'redux-saga/effects'
import { TipoProcessoService } from 'services/tipo-processos'
import { actions, UpdatePayload } from './slice'

export const sagas = [
  takeLatest(actions.list.type, listSaga),
  takeLatest(actions.update.type, updateSaga),
  takeLatest(actions.delete.type, deleteSaga)
]

function* listSaga() {
  try {
    const response: AxiosResponse<TipoProcessoModel[]> = yield call(
      TipoProcessoService.list
    )

    yield put(actions.listSuccess(response.data))
  } catch (error) {
    yield put(actions.listFailure())
  }
}

function* updateSaga(action: PayloadAction<UpdatePayload>) {
  try {
    const response: AxiosResponse<TipoProcessoModel> = yield call(() =>
      TipoProcessoService.update(action.payload.id, action.payload.data)
    )

    yield put(actions.updateSuccess(response.data))
  } catch (error) {
    yield put(actions.updateFailure())
  }
}

function* deleteSaga(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<TipoProcessoModel> = yield call(() =>
      TipoProcessoService.delete(action.payload)
    )

    yield put(actions.deleteSuccess(response.data))
  } catch (error) {
    yield put(actions.deleteFailure())
  }
}
