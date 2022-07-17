import { BoxProps, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = BoxProps & {
  children: ReactNode
  noHeader?: boolean
}

const Screen = ({ children, noHeader = false, ...boxProps }: Props) => {
  return (
    <Center
      bgColor="secondary.default"
      w="100vw"
      height="100%"
      minH={noHeader ? '100vh' : 'calc(100vh - 72px)'}
      px={{ base: '8px', md: '0' }}
      {...boxProps}
    >
      {children}
    </Center>
  )
}

export default Screen
