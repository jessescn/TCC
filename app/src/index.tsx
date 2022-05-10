import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { theme } from './style/theme'
import '@fontsource/inter'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </ReduxProvider>
)
