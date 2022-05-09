/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

export const wrapperProvider = () => {
  // good to wrapper some theme or store provider
  const wrapper = ({ children }: any) => {
    return children
  }

  return wrapper
}

const customRender = (component: React.ReactElement) => {
  const wrapper = wrapperProvider()

  return render(component, { wrapper })
}

function customRenderHook<T = any>(hook: any) {
  const wrapper = wrapperProvider()

  return renderHook<any, T>(hook, { wrapper })
}

export * from '@testing-library/react'
export {
  customRender as render,
  customRenderHook as renderHook,
  renderHook as baseRenderHook,
  userEvent
}
