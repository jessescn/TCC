import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { call, put, takeLatest } from 'redux-saga/effects'
import { Pagination, PaginationResponse } from 'services/config'
import { MeusProcedimentosService } from 'services/meus-procedimentos'
import { actions } from './slice'

export const sagas = [takeLatest(actions.list.type, listSaga)]

function* listSaga(action: PayloadAction<Pagination>) {
  try {
    const response: AxiosResponse<PaginationResponse<ProcedimentoModel>> =
      yield call(() => MeusProcedimentosService.list(action.payload))

    yield put(actions.listSuccess(response.data))
  } catch (error) {
    yield put(actions.listFailure())
  }
}
