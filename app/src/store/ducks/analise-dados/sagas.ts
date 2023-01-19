import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  AnaliseDadosResponse,
  TipoProcedimentoService
} from 'services/tipo-procedimentos'
import { actions, DataFetchPayload } from './slice'

export const sagas = [takeEvery(actions.fetchData.type, fetchDataSaga)]

function* fetchDataSaga(action: PayloadAction<DataFetchPayload>) {
  try {
    const data = {
      formulario: action.payload.formulario,
      campo: action.payload.campo,
      filtros: action.payload.filtros
    }

    const response: AxiosResponse<AnaliseDadosResponse> = yield call(() =>
      TipoProcedimentoService.analiseDados(action.payload.tipo, data)
    )

    yield put(
      actions.fetchDataSuccess({
        ...action.payload,
        tipoProcedimentoNome: response.data.tipoProcedimento.nome,
        formularioNome: response.data.formulario.nome,
        values: response.data.data
      })
    )
  } catch (error) {
    yield put(actions.fetchDataFailure())
  }
}
