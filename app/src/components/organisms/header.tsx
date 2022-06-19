import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'
import { actions, store, useSelector, selectors } from 'store'

export default function Header() {
  const currentUser = useSelector(selectors.session.getCurrentUser)

  const handleLogout = () => {
    store.dispatch(actions.session.logout())
  }

  return (
    <Flex
      w="100vw"
      h="72px"
      bgColor="primary.dark"
      alignItems="center"
      justifyContent="space-between"
      px="16px"
    >
      <Flex alignItems="center">
        {/* <Icon
          fontSize={{ base: '24px', md: '32px' }}
          as={GiHamburgerMenu}
          color="initial.white"
        /> */}
        <Text
          color="initial.white"
          fontWeight="bold"
          fontSize={{ base: '16px', md: '24px' }}
          ml="24px"
        >
          Computação UFCG
        </Text>
      </Flex>
      {currentUser && (
        <Flex alignItems="center" display={{ base: 'none', md: 'flex' }}>
          <Text mr="24px" color="initial.white">
            {currentUser.name}
          </Text>
          <Menu>
            <MenuButton>
              <Avatar
                bgColor="info.warning"
                size="md"
                name={currentUser.name}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>
                <Icon as={BiLogOut} />
                <Text ml={4}>Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Flex>
  )
}
