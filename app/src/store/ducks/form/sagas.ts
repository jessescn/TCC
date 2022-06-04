import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { FormModel } from 'domain/models/form'
import { call, put, takeLatest } from 'redux-saga/effects'
import { FormService } from 'services/forms'
import { actions, UpdatePayload } from './slice'

export const sagas = [
  takeLatest(actions.list.type, listForms),
  takeLatest(actions.update.type, updateForm),
  takeLatest(actions.delete.type, deleteForm)
]

function* listForms() {
  try {
    const forms: AxiosResponse<FormModel[]> = yield call(FormService.list)

    yield put(actions.listSuccess(forms.data))
  } catch (error) {
    yield put(actions.listFailure())
  }
}

function* updateForm(action: PayloadAction<UpdatePayload>) {
  try {
    const form: AxiosResponse<FormModel> = yield call(() =>
      FormService.update(action.payload.id, action.payload.data)
    )

    yield put(actions.updateSuccess(form.data))
  } catch (error) {
    yield put(actions.updateFailure())
  }
}

function* deleteForm(action: PayloadAction<number>) {
  try {
    const form: AxiosResponse<FormModel> = yield call(() =>
      FormService.delete(action.payload)
    )

    yield put(actions.deleteSuccess(form.data))
  } catch (error) {
    yield put(actions.deleteFailure())
  }
}
