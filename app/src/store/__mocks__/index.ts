/* eslint-disable @typescript-eslint/no-explicit-any */

import { Store } from 'redux'

const dispatch = jest.fn()
const subscribe = jest.fn()
const replaceReducer = jest.fn()
const observable = jest.fn()

export type GenerateOptions = {
  withIds?: number[]
}

export class StoreMockBuilder {
  private state: any = {}

  withState(value: any) {
    this.state = value
    return this
  }

  build(): Store {
    return {
      getState: () => this.state,
      dispatch,
      subscribe,
      replaceReducer,
      [Symbol.observable]: observable
    }
  }
}
