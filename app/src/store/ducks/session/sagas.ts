import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { UserModel } from '../../../domain/models/user'
import {
  AuthService,
  Credentials,
  CredentialsResponse
} from '../../../services/auth'

import { actions } from './slice'

export const sagas = [takeLatest(actions.login.type, authUser)]

export function* authUser(action: PayloadAction<Credentials>) {
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
  } catch (error) {
    console.warn(error)
    yield put(actions.loginFailure())
  }
}
