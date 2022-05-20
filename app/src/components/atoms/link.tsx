import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type Props = LinkProps & {
  redirectTo: string
  children: ReactNode
}

const Link = ({ children, redirectTo, ...linkStyle }: Props) => {
  return (
    <RouterLink to={redirectTo}>
      <ChakraLink
        as="p"
        fontSize="12px"
        textDecoration="underline"
        color="primary.default"
        {...linkStyle}
      >
        {children}
      </ChakraLink>
    </RouterLink>
  )
}

export default Link
