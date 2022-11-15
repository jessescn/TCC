import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { FormularioModel } from 'domain/models/formulario'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { Pagination, PaginationResponse } from 'services/config'
import { FormularioService } from 'services/formularios'
import { getPagination } from './selectors'
import { actions, CreatePayload, UpdatePayload } from './slice'

export const sagas = [
  takeLatest(actions.list.type, listSaga),
  takeLatest(actions.create.type, createSaga),
  takeLatest(actions.update.type, updateSaga),
  takeLatest(actions.delete.type, deleteSaga)
]

function* listSaga(action: PayloadAction<Pagination>) {
  try {
    const result: AxiosResponse<PaginationResponse<FormularioModel>> =
      yield call(() => FormularioService.list(action.payload))

    yield put(actions.listSuccess(result.data))
  } catch (error) {
    yield put(actions.listFailure())
  }
}

function* createSaga(action: PayloadAction<CreatePayload>) {
  try {
    const form: AxiosResponse<FormularioModel> = yield call(() =>
      FormularioService.create(action.payload)
    )

    yield put(actions.createSuccess(form.data))
  } catch (error) {
    yield put(actions.createFailure())
  }
}

function* updateSaga(action: PayloadAction<UpdatePayload>) {
  try {
    const currentPagination: Pagination = yield select(getPagination)

    yield call(() =>
      FormularioService.update(action.payload.id, action.payload.data)
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

    yield call(() => FormularioService.delete(action.payload))

    yield put(actions.deleteSuccess())
    yield call(listSaga, {
      payload: currentPagination,
      type: actions.list.type
    })
  } catch (error) {
    yield put(actions.deleteFailure())
  }
}
