import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { FormularioModel } from 'domain/models/formulario'
import { call, put, takeLatest } from 'redux-saga/effects'
import { FormService } from 'services/formularios'
import { actions, CreatePayload, UpdatePayload } from './slice'

export const sagas = [
  takeLatest(actions.list.type, listFormsSaga),
  takeLatest(actions.create.type, createFormSaga),
  takeLatest(actions.update.type, updateFormSaga),
  takeLatest(actions.delete.type, deleteFormSaga)
]

function* listFormsSaga() {
  try {
    const forms: AxiosResponse<FormularioModel[]> = yield call(FormService.list)

    yield put(actions.listSuccess(forms.data))
  } catch (error) {
    yield put(actions.listFailure())
  }
}

function* createFormSaga(action: PayloadAction<CreatePayload>) {
  try {
    const form: AxiosResponse<FormularioModel> = yield call(() =>
      FormService.create(action.payload)
    )

    yield put(actions.createSuccess(form.data))
  } catch (error) {
    yield put(actions.createFailure())
  }
}

function* updateFormSaga(action: PayloadAction<UpdatePayload>) {
  try {
    const form: AxiosResponse<FormularioModel> = yield call(() =>
      FormService.update(action.payload.id, action.payload.data)
    )

    yield put(actions.updateSuccess(form.data))
  } catch (error) {
    yield put(actions.updateFailure())
  }
}

function* deleteFormSaga(action: PayloadAction<number>) {
  try {
    const form: AxiosResponse<FormularioModel> = yield call(() =>
      FormService.delete(action.payload)
    )

    yield put(actions.deleteSuccess(form.data))
  } catch (error) {
    yield put(actions.deleteFailure())
  }
}
