import {
  Alert as ChakraAlert,
  AlertDescription as ChakraAlertDescription,
  AlertProps,
  AlertTitle as ChakraAlertTitle
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = AlertProps & {
  title?: ReactNode
  children: ReactNode
}

export default function Alert(props: Props) {
  const { title, children, ...styleProps } = props

  return (
    <ChakraAlert
      borderRadius="8px"
      bgColor="info.warning-light"
      flexDirection="column"
      alignItems="flex-start"
      {...styleProps}
    >
      {title && (
        <ChakraAlertTitle data-testid="alert-title-container">
          {title}
        </ChakraAlertTitle>
      )}
      <ChakraAlertDescription>{children}</ChakraAlertDescription>
    </ChakraAlert>
  )
}
