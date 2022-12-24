import { Link, LinkProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type Props = LinkProps & {
  redirectTo: string
  children: ReactNode
}

export const CustomLink = ({ children, redirectTo, ...linkStyle }: Props) => {
  return (
    <RouterLink to={redirectTo}>
      <Link
        as="p"
        fontSize="xs"
        textDecoration="underline"
        color="primary.default"
        {...linkStyle}
      >
        {children}
      </Link>
    </RouterLink>
  )
}
