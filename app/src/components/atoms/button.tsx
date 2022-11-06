import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = ButtonProps & {
  children: ReactNode
}

export const Button = ({ children, ...props }: Props) => {
  return (
    <ChakraButton
      color="initial.white"
      bgColor="primary.dark"
      mb="8px"
      _hover={{ bgColor: 'primary.default' }}
      fontSize={{ base: '14px', md: '16px' }}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
