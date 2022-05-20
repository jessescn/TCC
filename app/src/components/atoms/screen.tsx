import { BoxProps, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = BoxProps & {
  children: ReactNode
}

const Screen = ({ children, ...boxProps }: Props) => {
  return (
    <Center
      bgColor="secondary.default"
      w="100vw"
      h="100vh"
      px={{ base: '8px', md: '0' }}
      {...boxProps}
    >
      {children}
    </Center>
  )
}

export default Screen
