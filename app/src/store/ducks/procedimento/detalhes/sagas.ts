import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { NewComentario } from 'domain/models/comentario'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { UserModel } from 'domain/models/user'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { ComentarioService } from 'services/comentario'
import {
  ProcedimentoDetails,
  ProcedimentoService
} from 'services/procedimentos'
import { selectors } from '../..'
import { actions, VotePayload } from './slice'

export const sagas = [
  takeLatest(actions.getInfo.type, getInfoSaga),
  takeLatest(actions.vote.type, voteSaga),
  takeLatest(actions.comment.type, newCommentSaga),
  takeLatest(actions.forwardToSecretaria.type, forwardToSecretariaSaga)
]

function* getInfoSaga(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse<ProcedimentoDetails> = yield call(() =>
      ProcedimentoService.details(action.payload)
    )

    yield put(actions.getInfoSuccess(response.data))
  } catch (error) {
    yield put(actions.getInfoFailure())
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

    yield call(() =>
      ProcedimentoService.vote(action.payload.procedimentoId, {
        aprovado: action.payload.aprovado,
        autor: currentUser.id
      })
    )

    yield put(actions.voteSuccess())
    yield call(getInfoSaga, {
      payload: action.payload.procedimentoId,
      type: actions.getInfo.type
    })
  } catch (error) {
    yield put(actions.voteFailure())
  }
}

function* newCommentSaga(action: PayloadAction<NewComentario>) {
  try {
    yield call(() => ComentarioService.create(action.payload))

    yield put(actions.commentSuccess())
    yield call(getInfoSaga, {
      payload: action.payload.procedimento,
      type: actions.getInfo.type
    })
  } catch (error) {
    yield put(actions.commentFailure())
  }
}

function* forwardToSecretariaSaga() {
  try {
    const procedimento: ProcedimentoModel | undefined = yield select(
      selectors.procedimentoDetalhes.getProcedimento
    )

    if (!procedimento) {
      yield put(actions.forwardToSecretariaFailure())
      return
    }

    yield call(() => ProcedimentoService.forwardToSecretaria(procedimento.id))

    yield put(actions.forwardToSecretariaSuccess())
    yield call(getInfoSaga, {
      payload: procedimento.id,
      type: actions.getInfo.type
    })
  } catch (error) {
    yield put(actions.forwardToSecretariaFailure())
  }
}
