import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { FormularioModel } from 'domain/models/formulario'
import { call, put, takeLatest } from 'redux-saga/effects'
import { PaginationResponse } from 'services/config'
import { FormularioService } from 'services/formularios'
import { actions } from './slice'

export const sagas = [takeLatest(actions.getInfo.type, getInfoSaga)]

function* getInfoSaga(action: PayloadAction<string | null>) {
  try {
    let formulario: FormularioModel | undefined

    if (action.payload) {
      const formularioResponse: AxiosResponse<FormularioModel> = yield call(
        () => FormularioService.details(Number(action.payload))
      )

      formulario = formularioResponse.data
    }

    const formulariosResponse: AxiosResponse<
      PaginationResponse<FormularioModel>
    > = yield call(() =>
      FormularioService.list({ page: 1, per_page: 1000, term: null })
    )

    yield put(
      actions.getInfoSuccess({
        formulario: formulario,
        formularios: formulariosResponse.data.data
      })
    )
  } catch (error) {
    yield put(actions.getInfoFailure())
  }
}
