import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { Pagination, PaginationResponse } from 'services/config'
import { ProcedimentoService } from 'services/procedimentos'
import { getPagination } from './selectors'
import {
  actions,
  CreatePayload,
  NovaRevisaoPayload,
  UpdatePayload,
  UpdateStatusPayload
} from './slice'

export const sagas = [
  takeLatest(actions.list.type, listSaga),
  takeLatest(actions.create.type, createSaga),
  takeLatest(actions.update.type, updateSaga),
  takeLatest(actions.delete.type, deleteSaga),
  takeLatest(actions.updateStatus.type, updateStatusSaga),
  takeLatest(actions.novaRevisao.type, novaRevisaoSaga)
]

function* listSaga(action: PayloadAction<Pagination>) {
  try {
    const response: AxiosResponse<PaginationResponse<ProcedimentoModel>> =
      yield call(() => ProcedimentoService.list(action.payload))

    yield put(actions.listSuccess(response.data))
  } catch (error) {
    yield put(actions.listFailure())
  }
}

function* createSaga(action: PayloadAction<CreatePayload>) {
  try {
    const response: AxiosResponse<ProcedimentoModel> = yield call(() =>
      ProcedimentoService.create(action.payload)
    )

    yield put(actions.createSuccess(response.data))
  } catch (error) {
    yield put(actions.createFailure())
  }
}

function* updateSaga(action: PayloadAction<UpdatePayload>) {
  try {
    const currentPagination: Pagination = yield select(getPagination)
    yield call(() =>
      ProcedimentoService.update(action.payload.id, action.payload.data)
    )

    yield put(actions.updateSuccess())
    yield call(listSaga, {
      payload: currentPagination,
      type: actions.list.type
    })
  } catch (error) {
    yield put(actions.updateFailure())
  }
}

function* deleteSaga(action: PayloadAction<number>) {
  try {
    const currentPagination: Pagination = yield select(getPagination)

    yield call(() => ProcedimentoService.delete(action.payload))

    yield put(actions.deleteSuccess())
    yield call(listSaga, {
      payload: currentPagination,
      type: actions.list.type
    })
  } catch (error) {
    yield put(actions.deleteFailure())
  }
}

function* updateStatusSaga(action: PayloadAction<UpdateStatusPayload>) {
  try {
    const response: AxiosResponse<ProcedimentoModel> = yield call(() =>
      ProcedimentoService.updateStatus(action.payload.id, action.payload)
    )

    yield put(actions.updateStatusSuccess(response.data))
  } catch (error) {
    yield put(actions.updateStatusFailure())
  }
}

function* novaRevisaoSaga(action: PayloadAction<NovaRevisaoPayload>) {
  try {
    const response: AxiosResponse<ProcedimentoModel> = yield call(() =>
      ProcedimentoService.revisao(action.payload.id, action.payload.data)
    )

    yield put(actions.novaRevisaoSuccess(response.data))
  } catch (error) {
    yield put(actions.novaRevisaoFailure())
  }
}
