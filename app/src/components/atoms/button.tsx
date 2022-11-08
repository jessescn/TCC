import {
  Button as ChakraButton,
  ButtonProps,
  useMergeRefs
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type Props = ButtonProps & {
  children: ReactNode
  ref?: React.RefObject<HTMLButtonElement>
}

export const Button = ({ children, ref, ...props }: Props) => {
  const internalRef = React.useRef<HTMLButtonElement>()
  const refs = useMergeRefs(internalRef, ref) as any

  return (
    <ChakraButton
      color="initial.white"
      bgColor="primary.dark"
      mb="8px"
      _hover={{ bgColor: 'primary.default' }}
      fontSize={{ base: '14px', md: '16px' }}
      ref={refs}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
