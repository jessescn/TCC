import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { theme } from 'style/theme'
import { store } from 'store'

import { Provider as ReduxProvider } from 'react-redux'

type Props = {
  children: JSX.Element
  initialState?: typeof store
  customTheme?: typeof theme
}

export default function PageWrapper({
  children,
  customTheme,
  initialState
}: Props) {
  return (
    <ReduxProvider store={initialState || store}>
      <BrowserRouter>
        <ChakraProvider theme={customTheme || theme}>{children}</ChakraProvider>
      </BrowserRouter>
    </ReduxProvider>
  )
}
