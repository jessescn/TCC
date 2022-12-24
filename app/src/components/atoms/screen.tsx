import { BoxProps, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = BoxProps & {
  children: ReactNode
  noHeader?: boolean
}

const Screen = ({ children, noHeader = false, ...boxProps }: Props) => {
  return (
    <Center
      w="100%"
      h="fit-content"
      bgColor="secondary.default"
      minH={noHeader ? '100vh' : 'calc(100vh - 56px)'}
      px={{ base: '0.5rem', md: '0' }}
      alignItems="flex-start"
      {...boxProps}
    >
      {children}
    </Center>
  )
}

export default Screen
