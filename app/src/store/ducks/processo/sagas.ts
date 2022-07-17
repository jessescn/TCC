import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { RemoteProcessoModel } from 'domain/models/processo'
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
    const response: AxiosResponse<RemoteProcessoModel[]> = yield call(
      ProcessoService.list
    )

    // const processos = response.data.map(processo => ({
    //   ...processo,
    //   respostas: JSON.parse(processo.resposta)
    // }))

    yield put(actions.listSuccess(response.data as any))
  } catch (error) {
    yield put(actions.listFailure())
  }
}

function* updateProcessoSaga(action: PayloadAction<UpdatePayload>) {
  try {
    const response: AxiosResponse<RemoteProcessoModel> = yield call(() =>
      ProcessoService.update(action.payload.id, action.payload.data)
    )

    yield put(
      actions.updateSuccess({
        ...response.data,
        respostas: JSON.parse(response.data.resposta)
      })
    )
  } catch (error) {
    yield put(actions.updateFailure())
  }
}

function* deleteProcessoSaga(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<RemoteProcessoModel> = yield call(() =>
      ProcessoService.delete(action.payload)
    )

    yield put(
      actions.deleteSuccess({
        ...response.data,
        respostas: JSON.parse(response.data.resposta)
      })
    )
  } catch (error) {
    yield put(actions.deleteFailure())
  }
}
