import { FormularioService } from 'services/formularios'
import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { call, put, takeLatest } from 'redux-saga/effects'
import { TipoProcedimentoService } from 'services/tipo-procedimentos'
import { actions } from './slice'
import { FormularioModel } from 'domain/models/formulario'
import { PaginationResponse } from 'services/config'
import { UserService } from 'services/user'

export const sagas = [takeLatest(actions.getInfo.type, getInfoSaga)]

function* _fetch_formularios() {
  const result: AxiosResponse<PaginationResponse<FormularioModel>> = yield call(
    () => FormularioService.list({ page: 1, per_page: 1000, term: null })
  )

  const formularios = result.data.data.filter(formulario => !formulario.deleted)

  return formularios
}

function* _fetch_publicos() {
  const result: AxiosResponse<string[]> = yield call(() =>
    UserService.publicos()
  )

  return result.data
}

function* getInfoSaga(action: PayloadAction<string | null>) {
  try {
    console.log('CHAMOU')

    let tipoProcedimento: TipoProcedimentoModel | undefined

    if (action.payload !== null) {
      const response: AxiosResponse<TipoProcedimentoModel> = yield call(() =>
        TipoProcedimentoService.details(Number(action.payload))
      )

      tipoProcedimento = response.data
    }

    const formularios: FormularioModel[] = yield _fetch_formularios()
    const publicos: string[] = yield _fetch_publicos()

    yield put(
      actions.getInfoSuccess({
        formularios,
        publicos,
        tipo: tipoProcedimento
      })
    )
  } catch (error) {
    yield put(actions.getInfoFailure())
  }
}
