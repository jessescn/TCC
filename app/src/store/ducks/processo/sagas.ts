import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { ProcessoModel } from 'domain/models/processo'
import { call, put, takeLatest } from 'redux-saga/effects'
import { ProcessoService } from 'services/processos'
import { actions, UpdatePayload } from './slice'

export const sagas = [
  takeLatest(actions.list.type, listProcessosSaga),
  takeLatest(actions.update.type, updateProcessoSaga),
  takeLatest(actions.delete.type, deleteProcessoSaga)
]

function* listProcessosSaga() {
  try {
    const processos: AxiosResponse<ProcessoModel[]> = yield call(
      ProcessoService.list
    )

    yield put(actions.listSuccess(processos.data))
  } catch (error) {
    yield put(actions.listFailure())
  }
}

function* updateProcessoSaga(action: PayloadAction<UpdatePayload>) {
  try {
    const processo: AxiosResponse<ProcessoModel> = yield call(() =>
      ProcessoService.update(action.payload.id, action.payload.data)
    )

    yield put(actions.updateSuccess(processo.data))
  } catch (error) {
    yield put(actions.updateFailure())
  }
}

function* deleteProcessoSaga(action: PayloadAction<number>) {
  try {
    const processo: AxiosResponse<ProcessoModel> = yield call(() =>
      ProcessoService.delete(action.payload)
    )

    yield put(actions.deleteSuccess(processo.data))
  } catch (error) {
    yield put(actions.deleteFailure())
  }
}
