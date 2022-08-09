import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { call, put, takeLatest } from 'redux-saga/effects'
import { TipoProcedimentoService } from 'services/tipo-procedimentos'
import { actions, CreatePayload, UpdatePayload } from './slice'

export const sagas = [
  takeLatest(actions.list.type, listSaga),
  takeLatest(actions.update.type, updateSaga),
  takeLatest(actions.delete.type, deleteSaga),
  takeLatest(actions.create.type, createSaga)
]

function* listSaga() {
  try {
    const response: AxiosResponse<TipoProcedimentoModel[]> = yield call(
      TipoProcedimentoService.list
    )

    yield put(actions.listSuccess(response.data))
  } catch (error) {
    yield put(actions.listFailure())
  }
}

function* createSaga(action: PayloadAction<CreatePayload>) {
  try {
    const response: AxiosResponse<TipoProcedimentoModel> = yield call(() =>
      TipoProcedimentoService.create(action.payload)
    )

    yield put(actions.createSuccess(response.data))
  } catch (error) {
    yield put(actions.createFailure())
  }
}

function* updateSaga(action: PayloadAction<UpdatePayload>) {
  try {
    const response: AxiosResponse<TipoProcedimentoModel> = yield call(() =>
      TipoProcedimentoService.update(action.payload.id, action.payload.data)
    )

    yield put(actions.updateSuccess(response.data))
  } catch (error) {
    yield put(actions.updateFailure())
  }
}

function* deleteSaga(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<TipoProcedimentoModel> = yield call(() =>
      TipoProcedimentoService.delete(action.payload)
    )

    yield put(actions.deleteSuccess(response.data))
  } catch (error) {
    yield put(actions.deleteFailure())
  }
}
