import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { CreateUser, UserService } from '../../../services/user'
import { actions } from './slice'

export const sagas = [takeLatest(actions.create.type, createUser)]

function* createUser(action: PayloadAction<CreateUser>) {
  try {
    yield call(() => UserService.create(action.payload))

    yield put(actions.createSuccess())
  } catch (error) {
    console.warn(error)
    yield put(actions.createFailure())
  }
}
