/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormModel } from 'domain/models/form'
import { ProcessoModel } from 'domain/models/processo'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  forms: FormModel[]
  status: Status
}

export type UpdatePayload = {
  data: Partial<FormModel>
  id: number
}

export const initialState: State = {
  forms: [],
  status: 'pristine'
}

const reducers = {
  list: (state: State) => {
    state.status = 'loading'
  },
  listSuccess: (state: State, action: PayloadAction<FormModel[]>) => {
    state.status = 'success'
    state.forms = action.payload
  },
  listFailure: (state: State) => {
    state.status = 'failure'
  },
  update: (state: State, action: PayloadAction<UpdatePayload>) => {
    state.status = 'loading'
  },
  updateSuccess: (state: State, action: PayloadAction<FormModel>) => {
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
  deleteSuccess: (state: State, action: PayloadAction<FormModel>) => {
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