import { AxiosResponse } from 'axios'
import { PayloadAction } from '@reduxjs/toolkit'
import { UserModel } from 'domain/models/user'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { Pagination, PaginationResponse } from 'services/config'
import { CreateUser, UpdatePassword, UserService } from 'services/usuarios'
import { actions, CreateBulk } from './slice'
import { getPagination } from './selectors'

export const sagas = [
  takeLatest(actions.create.type, createUserSaga),
  takeLatest(actions.createBulk.type, createBulkSaga),
  takeLatest(actions.list.type, listSaga),
  takeLatest(actions.delete.type, deleteSaga),
  takeLatest(actions.changePasswordEmail.type, changePasswordEmailSaga),
  takeLatest(actions.updatePassword.type, updatePasswordSaga)
]

function* createUserSaga(action: PayloadAction<CreateUser>) {
  try {
    yield call(() => UserService.create(action.payload))

    yield put(actions.createSuccess())
  } catch (error: any) {
    yield put(actions.createFailure(error?.response?.data))
  }
}

function* createBulkSaga(action: PayloadAction<CreateBulk>) {
  try {
    yield call(() => UserService.createBulk(action.payload.file))

    const currentPagination: Pagination = yield select(getPagination)

    const listPayload = {
      payload: currentPagination,
      type: actions.list.type
    }

    yield call(listSaga, listPayload)

    yield put(actions.createBulkSuccess())
  } catch (error: any) {
    yield put(
      actions.createBulkFailure(
        error?.response?.data || 'Erro ao cadastrar usuários'
      )
    )
  }
}

function* listSaga(action: PayloadAction<Pagination>) {
  try {
    const result: AxiosResponse<PaginationResponse<UserModel>> = yield call(
      () => UserService.list(action.payload)
    )

    yield put(actions.listSuccess(result.data))
  } catch (error: any) {
    yield put(actions.listFailure())
  }
}

function* deleteSaga(action: PayloadAction<number>) {
  try {
    yield call(() => UserService.delete(action.payload))

    const currentPagination: Pagination = yield select(getPagination)

    const listPayload = {
      payload: currentPagination,
      type: actions.list.type
    }

    yield call(listSaga, listPayload)

    yield put(actions.deleteSuccess())
  } catch (error: any) {
    yield put(actions.deleteFailure())
  }
}

export function* changePasswordEmailSaga(action: PayloadAction<string>) {
  try {
    yield call(() => UserService.changePasswordEmail(action.payload))

    yield put(actions.changePasswordEmailSuccess())
  } catch (error: any) {
    yield put(actions.changePasswordEmailFailure(error?.response?.data))
  }
}

export function* updatePasswordSaga(action: PayloadAction<UpdatePassword>) {
  try {
    yield call(() => UserService.updatePassword(action.payload))

    yield put(actions.updatePasswordSuccess())
  } catch (error: any) {
    yield put(actions.updatePasswordFailure(error?.response?.data))
  }
}
