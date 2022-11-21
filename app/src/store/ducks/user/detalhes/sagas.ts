import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { ProfileModel, UserModel } from 'domain/models/user'
import { call, put, takeLatest } from 'redux-saga/effects'
import { UserService } from 'services/usuarios'
import { sidebarInfoSaga } from 'store/ducks/session/sagas'
import { actions, UpdatePayload } from './slice'

export const sagas = [
  takeLatest(actions.getInfo.type, getInfoSaga),
  takeLatest(actions.update.type, updateSaga)
]

function* getInfoSaga(action: PayloadAction<number>) {
  try {
    const { data: usuario }: AxiosResponse<UserModel> = yield call(() =>
      UserService.details(action.payload)
    )

    const { data: profiles }: AxiosResponse<ProfileModel[]> = yield call(() =>
      UserService.profiles()
    )

    const { data: publicos }: AxiosResponse<string[]> = yield call(() =>
      UserService.publicos()
    )

    yield put(
      actions.getInfoSuccess({
        usuario,
        profiles,
        publicos
      })
    )
  } catch (error: any) {
    yield put(actions.getInfoFailure())
  }
}

function* updateSaga(action: PayloadAction<UpdatePayload>) {
  try {
    const { id, data } = action.payload
    yield call(() => UserService.update(id, data))

    yield put(actions.updateSuccess())
    yield call(sidebarInfoSaga)
  } catch (error: any) {
    yield put(actions.updateFailure())
  }
}
