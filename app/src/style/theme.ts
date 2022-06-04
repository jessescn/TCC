import { extendTheme } from '@chakra-ui/react'

const colors = {
  primary: {
    default: '#1E68D0',
    dark: '#31498F'
  },
  secondary: {
    light: '#F7F7F7',
    default: '#EFEFEF',
    dark: '#BCBCBC'
  },
  initial: {
    white: '#FFFFFF',
    black: '#333333'
  },
  info: {
    success: '#44CF6C',
    warning: '#FFC914',
    'warning-light': '#FBE28D',
    error: '#FE5F55'
  }
}

const theme = extendTheme({
  colors,
  fonts: { heading: 'Inter, sans serif', body: 'Inter, sans serif' }
})

export { theme }
