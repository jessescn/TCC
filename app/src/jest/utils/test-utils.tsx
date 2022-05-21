import React from 'react'

import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'store'

type WrapperProps = {
  initial?: typeof store
}

export const wrapperProvider = ({ initial }: WrapperProps) => {
  // good to wrapper some theme or store provider
  const wrapper = ({ children }: any) => {
    return <ReduxProvider store={initial || store}>{children}</ReduxProvider>
  }

  return wrapper
}

const customRender = (
  component: React.ReactElement,
  options: WrapperProps = {}
) => {
  const wrapper = wrapperProvider(options)

  return render(component, { wrapper })
}

function customRenderHook<T = any>(hook: any, options: WrapperProps = {}) {
  const wrapper = wrapperProvider(options)

  return renderHook<any, T>(hook, { wrapper })
}

export * from '@testing-library/react'
export {
  customRender as render,
  customRenderHook as renderHook,
  renderHook as baseRenderHook,
  screen,
  userEvent
}
