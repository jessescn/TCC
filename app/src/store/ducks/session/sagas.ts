import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { UserModel } from 'domain/models/user'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  AuthService,
  Credentials,
  CredentialsResponse,
  SidebarInfo
} from 'services/auth'

import { actions } from './slice'

export const sagas = [
  takeLatest(actions.login.type, authUserSaga),
  takeLatest(actions.sidebarInfo.type, sidebarInfoSaga)
]

export function* authUserSaga(action: PayloadAction<Credentials>) {
  try {
    const response: AxiosResponse<CredentialsResponse> = yield call(() =>
      AuthService.token(action.payload)
    )

    if (response.status !== 200) {
      yield put(actions.loginFailure())
    }

    localStorage.setItem('access_token', response.data.token)

    const data: AxiosResponse<UserModel> = yield call(() => AuthService.me())

    localStorage.setItem('session_user', JSON.stringify(data.data))

    yield put(actions.loginSuccess(data.data))
  } catch (error: any) {
    yield put(actions.loginFailure(error?.response?.data))
  }
}

export function* sidebarInfoSaga() {
  try {
    const response: AxiosResponse<SidebarInfo> = yield call(() =>
      AuthService.sidebarInfo()
    )

    yield put(actions.sidebarInfoSuccess(response.data.open))
  } catch (error: any) {
    yield put(actions.sidebarInfoFailure())
  }
}
