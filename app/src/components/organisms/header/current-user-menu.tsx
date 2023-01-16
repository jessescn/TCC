import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text
} from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'
import { actions, selectors, store, useSelector } from 'store'

export default function CurrentUserMenu() {
  const currentUser = useSelector(selectors.session.getCurrentUser)

  const handleLogout = () => {
    store.dispatch(actions.session.logout({ reload: true }))
  }

  return (
    <Flex align="center">
      <Menu>
        <MenuButton>
          <Flex>
            <Box textAlign="end" mr="1rem">
              <Text color="initial.white" size="md" fontWeight="bold">
                {currentUser?.nome}
              </Text>
              <Text color="secondary.dark" fontSize="xs">
                {currentUser?.email}
              </Text>
            </Box>
            <Avatar
              size="sm"
              name={currentUser?.nome || ''}
              borderColor="initial.white"
              borderWidth="1px"
            />
          </Flex>
        </MenuButton>
        <Portal>
          <MenuList p={0}>
            <MenuItem fontSize="md" onClick={handleLogout} icon={<BiLogOut />}>
              Sair
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </Flex>
  )
}
