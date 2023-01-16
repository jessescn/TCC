/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormularioModel } from 'domain/models/formulario'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { FetchData } from 'services/tipo-procedimentos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'
export type GraphType = 'bar' | 'pie' | 'radial'

export type DataFetchPayload = {
  tipo: number
  formulario: number
  campo: string
  type: GraphType
  filtros?: any
  position: number
}

export type DataFetched = DataFetchPayload & {
  tipoProcedimentoNome: string
  formularioNome: string
  values: FetchData[]
}

export type Configuration = {
  tipoProcedimento?: number
  formulario?: number
}

export type State = {
  fetchStatus: Status
  dataInfo: DataFetched[]
}

export const initialState: State = {
  fetchStatus: 'pristine',
  dataInfo: []
}

const reducers = {
  resetState: (state: State) => {
    state.dataInfo = initialState.dataInfo
    state.fetchStatus = initialState.fetchStatus
  },
  fetchData: (state: State, action: PayloadAction<DataFetchPayload>) => {
    state.fetchStatus = 'loading'
  },
  fetchDataSuccess: (state: State, action: PayloadAction<DataFetched>) => {
    if (state.dataInfo.length < action.payload.position + 1) {
      state.dataInfo.push(action.payload)
    } else {
      state.dataInfo[action.payload.position] = action.payload
    }
    state.fetchStatus = 'success'
  },
  fetchDataFailure: (state: State) => {
    state.fetchStatus = 'failure'
  },
  deleteData: (state: State, action: PayloadAction<number>) => {
    const copy = [...state.dataInfo]
    copy.splice(action.payload, 1)
    state.dataInfo = copy
  },
  resetStatus: (state: State) => {
    state.fetchStatus = 'pristine'
  }
}

const analiseDados = createSlice({
  name: 'analise-dados',
  initialState,
  reducers
})

export const actions = analiseDados.actions
export const reducer = analiseDados.reducer
