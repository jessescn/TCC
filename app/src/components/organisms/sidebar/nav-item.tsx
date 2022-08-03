import {
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  StyleProps,
  Text
} from '@chakra-ui/react'
import { User } from 'domain/entity/user'
import { Roles } from 'domain/types/actors'
import { IconType } from 'react-icons'
import { GrUserAdmin } from 'react-icons/gr'
import { useLocation, useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export type NavItemProps = {
  icon?: IconType
  title: string
  url: string
  roles?: Roles[]
  strict?: boolean
  style?: StyleProps
  isSubitem?: boolean
}

export default function NavItem({
  icon,
  title,
  url,
  roles = [],
  strict = false,
  style,
  isSubitem = false
}: NavItemProps) {
  const currentUser = useSelector(selectors.session.getCurrentUser)
  const navigate = useNavigate()
  const location = useLocation()

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

  const validation = strict ? User.haveAllRoles : User.haveOneRole

  const havePermission =
    roles.length > 0
      ? currentUser
        ? validation(currentUser, roles)
        : false
      : true

  return !havePermission ? null : (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={'flex-start'}
      onClick={handleNavigate}
      {...style}
    >
      <Menu placement="right">
        <Link
          p={3}
          borderRadius={8}
          _hover={selectedStyle}
          w={'100%'}
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
                  fontSize={isSubitem ? '12px' : '14px'}
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
