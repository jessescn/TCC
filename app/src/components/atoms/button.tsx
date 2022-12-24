import {
  Button as ChakraButton,
  ButtonProps,
  useMergeRefs
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type Props = ButtonProps & {
  children: ReactNode
  customVariant?: 'default' | 'ghost' | 'outline'
  ref?: React.RefObject<HTMLButtonElement>
}

export const Button = ({ children, ref, customVariant, ...props }: Props) => {
  const internalRef = React.useRef<HTMLButtonElement>()
  const refs = useMergeRefs(internalRef, ref) as any

  const ghostStyle: ButtonProps = {
    bgColor: 'transparent',
    border: 'none',
    color: 'initial.black',
    _focus: { boxShadow: 'none' },
    _hover: { bgColor: 'transparent', color: 'initial.back' }
  }

  const outlineStyle: ButtonProps = {
    bgColor: 'transparent',
    borderWidth: '2px',
    borderColor: 'primary.dark',
    color: 'primary.dark',
    _hover: { bgColor: 'primary.dark', color: 'initial.white' }
  }

  const defaultStyle: ButtonProps = {
    bgColor: 'primary.dark',
    border: 'none',
    color: 'initial.white',
    _hover: { bgColor: 'primary.default', color: 'initial.white' }
  }

  const stylesMap = {
    default: defaultStyle,
    outline: outlineStyle,
    ghost: ghostStyle
  }

  const buttonStyle = customVariant ? stylesMap[customVariant] : defaultStyle

  return (
    <ChakraButton
      ref={refs}
      minW="fit-content"
      color="initial.white"
      bgColor="primary.dark"
      _hover={{ bgColor: 'primary.default' }}
      {...buttonStyle}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
