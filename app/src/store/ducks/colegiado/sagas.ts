import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { UserModel } from 'domain/models/user'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { ColegiadoService } from 'services/colegiado'
import { Pagination, PaginationResponse } from 'services/config'
import { selectors } from '..'
import { getPagination } from './selectors'
import { actions, VotePayload } from './slice'

export const sagas = [
  takeLatest(actions.list.type, listSaga),
  takeLatest(actions.vote.type, voteSaga)
]

function* listSaga(action: PayloadAction<Pagination>) {
  try {
    const response: AxiosResponse<PaginationResponse<ProcedimentoModel>> =
      yield call(() => ColegiadoService.list(action.payload))

    yield put(actions.listSuccess(response.data))
  } catch (error) {
    yield put(actions.listFailure())
  }
}

function* voteSaga(action: PayloadAction<VotePayload>) {
  try {
    const currentPagination: Pagination = yield select(getPagination)
    const currentUser: UserModel = yield select(
      selectors.session.getCurrentUser
    )

    if (!currentUser) {
      yield put(actions.voteFailure())
    }

    yield call(() =>
      ColegiadoService.vote(action.payload.procedimentoId, {
        aprovado: action.payload.aprovado,
        autor: currentUser.id
      })
    )

    yield put(actions.voteSuccess())
    yield call(listSaga, {
      payload: currentPagination,
      type: actions.list.type
    })
  } catch (error) {
    yield put(actions.voteFailure())
  }
}
