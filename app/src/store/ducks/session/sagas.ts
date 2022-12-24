import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { UserModel } from 'domain/models/user'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  AuthCredentials,
  AuthService,
  CredentialsResponse,
  SidebarInfo
} from 'services/auth'

import { actions } from './slice'

export const sagas = [
  takeLatest(actions.login.type, authUserSaga),
  takeLatest(actions.sidebarInfo.type, sidebarInfoSaga),
  takeLatest(actions.sendEmailConfirmation.type, sendEmailConfirmationSaga),
  takeLatest(
    actions.exchangeEmailConfirmationCode.type,
    exchangeEmailConfirmationCodeSaga
  )
]

export function* authUserSaga(action: PayloadAction<AuthCredentials>) {
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

export function* sendEmailConfirmationSaga() {
  try {
    yield call(() => AuthService.emailConfirmation())

    yield put(actions.sendEmailConfirmationSuccess())
  } catch (error: any) {
    yield put(actions.sendEmailConfirmationFailure())
  }
}

export function* exchangeEmailConfirmationCodeSaga(
  action: PayloadAction<string>
) {
  try {
    const response: AxiosResponse<UserModel> = yield call(() =>
      AuthService.exchangeEmailConfirmationCode(action.payload)
    )

    localStorage.setItem('session_user', JSON.stringify(response.data))

    yield put(actions.exchangeEmailConfirmationCodeSuccess(response.data))
  } catch (error: any) {
    yield put(
      actions.exchangeEmailConfirmationCodeFailure(error?.response?.data)
    )
  }
}
