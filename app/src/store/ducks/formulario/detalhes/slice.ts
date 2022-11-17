/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormularioModel } from 'domain/models/formulario'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  formulario?: FormularioModel
  formularios: FormularioModel[]
  statusFetch: Status
}

export const initialState: State = {
  statusFetch: 'pristine',
  formularios: []
}

export type GetInfoResponse = {
  formulario?: FormularioModel
  formularios: FormularioModel[]
}

const reducers = {
  getInfo: (state: State, action: PayloadAction<string | null>) => {
    state.statusFetch = 'loading'
    state.formulario = initialState.formulario
    state.formularios = initialState.formularios
  },
  getInfoSuccess: (state: State, action: PayloadAction<GetInfoResponse>) => {
    state.statusFetch = 'success'
    state.formulario = action.payload.formulario
    state.formularios = action.payload.formularios
  },
  getInfoFailure: (state: State) => {
    state.statusFetch = 'failure'
  },
  resetState: (state: State) => {
    state.statusFetch = initialState.statusFetch
    state.formulario = initialState.formulario
    state.formularios = initialState.formularios
  }
}

const formularioDetalhes = createSlice({
  name: 'formularioDetalhes',
  initialState,
  reducers
})

export const actions = formularioDetalhes.actions
export const reducer = formularioDetalhes.reducer
