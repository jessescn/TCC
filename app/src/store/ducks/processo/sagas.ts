import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { ProcessoModel } from 'domain/models/processo'
import { UserModel } from 'domain/models/user'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { ProcessoService } from 'services/processos'
import { selectors } from '..'
import {
  actions,
  CreatePayload,
  NovaRevisaoPayload,
  UpdatePayload,
  UpdateStatusPayload,
  VotePayload
} from './slice'

export const sagas = [
  takeLatest(actions.list.type, listSaga),
  takeLatest(actions.create.type, createSaga),
  takeLatest(actions.update.type, updateSaga),
  takeLatest(actions.delete.type, deleteSaga),
  takeLatest(actions.vote.type, voteSaga),
  takeLatest(actions.updateStatus.type, updateStatusSaga),
  takeLatest(actions.novaRevisao.type, novaRevisaoSaga)
]

function* listSaga() {
  try {
    const response: AxiosResponse<ProcessoModel[]> = yield call(
      ProcessoService.list
    )

    yield put(actions.listSuccess(response.data as any))
  } catch (error) {
    yield put(actions.listFailure())
  }
}

function* createSaga(action: PayloadAction<CreatePayload>) {
  try {
    const response: AxiosResponse<ProcessoModel> = yield call(() =>
      ProcessoService.create(action.payload)
    )

    console.log(response.data)

    yield put(actions.createSuccess(response.data))
  } catch (error) {
    yield put(actions.createFailure())
  }
}

function* updateSaga(action: PayloadAction<UpdatePayload>) {
  try {
    const response: AxiosResponse<ProcessoModel> = yield call(() =>
      ProcessoService.update(action.payload.id, action.payload.data)
    )

    yield put(actions.updateSuccess(response.data))
  } catch (error) {
    yield put(actions.updateFailure())
  }
}

function* deleteSaga(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<ProcessoModel> = yield call(() =>
      ProcessoService.delete(action.payload)
    )

    yield put(actions.deleteSuccess(response.data))
  } catch (error) {
    yield put(actions.deleteFailure())
  }
}

function* voteSaga(action: PayloadAction<VotePayload>) {
  try {
    const currentUser: UserModel = yield select(
      selectors.session.getCurrentUser
    )

    if (!currentUser) {
      yield put(actions.voteFailure())
    }

    const response: AxiosResponse<ProcessoModel> = yield call(() =>
      ProcessoService.vote(action.payload.processoId, {
        aprovado: action.payload.aprovado,
        autor: currentUser.id
      })
    )

    yield put(actions.voteSuccess(response.data))
  } catch (error) {
    yield put(actions.voteFailure())
  }
}

function* updateStatusSaga(action: PayloadAction<UpdateStatusPayload>) {
  try {
    const response: AxiosResponse<ProcessoModel> = yield call(() =>
      ProcessoService.updateStatus(action.payload.id, action.payload)
    )

    yield put(actions.updateStatusSuccess(response.data))
  } catch (error) {
    yield put(actions.updateStatusFailure())
  }
}

function* novaRevisaoSaga(action: PayloadAction<NovaRevisaoPayload>) {
  try {
    const response: AxiosResponse<ProcessoModel> = yield call(() =>
      ProcessoService.revisao(action.payload.id, action.payload.data)
    )

    yield put(actions.novaRevisaoSuccess(response.data))
  } catch (error) {
    yield put(actions.novaRevisaoFailure())
  }
}
