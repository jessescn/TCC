import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { Pagination, PaginationResponse } from 'services/config'
import { TipoProcedimentoService } from 'services/tipo-procedimentos'
import { sidebarInfoSaga } from '../session/sagas'
import { getPagination } from './selectors'
import { actions, CreatePayload, UpdatePayload } from './slice'

export const sagas = [
  takeLatest(actions.list.type, listSaga),
  takeLatest(actions.update.type, updateSaga),
  takeLatest(actions.delete.type, deleteSaga),
  takeLatest(actions.create.type, createSaga)
]

function* listSaga(action: PayloadAction<Pagination>) {
  try {
    const response: AxiosResponse<PaginationResponse<TipoProcedimentoModel>> =
      yield call(() => TipoProcedimentoService.list(action.payload))

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
    yield call(sidebarInfoSaga)
  } catch (error) {
    yield put(actions.createFailure())
  }
}

function* updateSaga(action: PayloadAction<UpdatePayload>) {
  try {
    const currentPagination: Pagination = yield select(getPagination)
    yield call(() =>
      TipoProcedimentoService.update(action.payload.id, action.payload.data)
    )

    const listPayload = {
      payload: currentPagination,
      type: actions.list.type
    }

    yield put(actions.updateSuccess())
    yield call(listSaga, listPayload)
    yield call(sidebarInfoSaga)
  } catch (error) {
    yield put(actions.updateFailure())
  }
}

function* deleteSaga(action: PayloadAction<number>) {
  try {
    const currentPagination: Pagination = yield select(getPagination)
    yield call(() => TipoProcedimentoService.delete(action.payload))

    yield put(actions.deleteSuccess())
    yield call(listSaga, {
      payload: currentPagination,
      type: actions.list.type
    })
  } catch (error) {
    yield put(actions.deleteFailure())
  }
}
