import {
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  StyleProps,
  Text
} from '@chakra-ui/react'
import { ProfileType } from 'domain/models/user'
import { IconType } from 'react-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export type NavItemProps = {
  icon?: IconType
  title: string
  url: string
  profiles?: ProfileType[]
  strict?: boolean
  style?: StyleProps
  isSubitem?: boolean
}

export default function NavItem({
  icon,
  title,
  url,
  profiles = [],
  style,
  isSubitem = false
}: NavItemProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const havePermission = useSelector(selectors.session.hasRoutePermission)(
    profiles
  )

  const isCurrentRoute = location.pathname === url

  const handleNavigate = () => {
    navigate(url)
    store.dispatch(actions.session.closeSidebar())
  }

  const selectedStyle = {
    textDecor: 'none',
    backgroundColor: 'primary.dark',
    color: 'initial.white'
  }

  const linkStyle = isCurrentRoute ? selectedStyle : {}

  return !havePermission ? null : (
    <Flex
      mt="1.5rem"
      flexDir="column"
      w="100%"
      alignItems={'flex-start'}
      onClick={handleNavigate}
      {...style}
    >
      <Menu placement="right">
        <Link
          p={3}
          w={'100%'}
          borderRadius={8}
          _hover={selectedStyle}
          {...linkStyle}
        >
          <MenuButton
            w="100%"
            height="fit-content"
            style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
          >
            <Flex alignItems="center">
              {icon && <Icon as={icon} fontSize="lg" />}
              <Flex alignItems="center">
                <Text
                  ml={icon ? 2 : 0}
                  display={'flex'}
                  fontSize={isSubitem ? 'xs' : 'sm'}
                >
                  {title}
                </Text>
              </Flex>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  )
}
