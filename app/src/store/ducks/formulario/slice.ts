/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  forms: FormularioModel[]
  status: Status
}

export type UpdatePayload = {
  data: Partial<FormularioModel>
  id: number
}

export type CreatePayload = {
  nome: string
  descricao?: string
  campos: CampoFormulario[]
}

export const initialState: State = {
  forms: [],
  status: 'pristine'
}

const reducers = {
  list: (state: State) => {
    state.status = 'loading'
  },
  listSuccess: (state: State, action: PayloadAction<FormularioModel[]>) => {
    state.status = 'success'
    state.forms = action.payload
  },
  listFailure: (state: State) => {
    state.status = 'failure'
  },
  create: (state: State, action: PayloadAction<CreatePayload>) => {
    state.status = 'loading'
  },
  createSuccess: (state: State, action: PayloadAction<FormularioModel>) => {
    state.status = 'success'
    state.forms = [...state.forms, action.payload]
  },
  createFailure: (state: State) => {
    state.status = 'failure'
  },
  update: (state: State, action: PayloadAction<UpdatePayload>) => {
    state.status = 'loading'
  },
  updateSuccess: (state: State, action: PayloadAction<FormularioModel>) => {
    state.status = 'success'

    const indexof = state.forms.map(elm => elm.id).indexOf(action.payload.id)
    state.forms.splice(indexof, 1, action.payload)
  },
  updateFailure: (state: State) => {
    state.status = 'failure'
  },
  delete: (state: State, action: PayloadAction<number>) => {
    state.status = 'loading'
  },
  deleteSuccess: (state: State, action: PayloadAction<FormularioModel>) => {
    state.status = 'success'
    state.forms = state.forms.filter(form => form.id !== action.payload.id)
  },
  deleteFailure: (state: State) => {
    state.status = 'failure'
  }
}

const form = createSlice({
  name: 'form',
  initialState,
  reducers
})

export const actions = form.actions
export const reducer = form.reducer
