import {
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  StyleProps,
  Text
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { GrUserAdmin } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { actions, store } from 'store'

export type NavItemProps = {
  icon?: IconType
  title: string
  url: string
  adminOnly?: boolean
  style?: StyleProps
}

export default function NavItem({
  icon,
  title,
  url,
  adminOnly,
  style
}: NavItemProps) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(url)
    store.dispatch(actions.session.closeSidebar())
  }

  return (
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
          _hover={{
            textDecor: 'none',
            backgroundColor: 'primary.dark',
            color: 'initial.white'
          }}
          w={'100%'}
        >
          <MenuButton
            w="100%"
            height="fit-content"
            style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
          >
            <Flex alignItems="center">
              {icon && <Icon as={icon} fontSize="xl" />}
              <Flex alignItems="center">
                <Text ml={icon ? 3 : 0} display={'flex'}>
                  {title}
                </Text>
                {adminOnly && <Icon as={GrUserAdmin} fontSize="md" ml="8px" />}
              </Flex>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  )
}
