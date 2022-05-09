import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { theme } from './theme'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)
