import { Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { actions, store } from 'store'
import CurrentUserMenu from './current-user-menu'

export default function Header() {
  const toggleSidebar = () => {
    store.dispatch(actions.session.toggleSidebar())
  }

  return (
    <Flex
      w="100%"
      h="56px"
      bgColor="primary.dark"
      alignItems="center"
      justifyContent="space-between"
      px="1rem"
    >
      <Flex alignItems="center">
        <IconButton
          aria-label="botão menu"
          bgColor="transparent"
          onClick={toggleSidebar}
          _focus={{ boxShadow: 'none' }}
          _hover={{ bgColor: 'transparent' }}
          _active={{ bgColor: 'transparent' }}
          icon={
            <Icon
              as={HiMenuAlt1}
              fontSize={{ base: '1rem', md: '1.5rem' }}
              color="initial.white"
            />
          }
        />
        <Text
          color="initial.white"
          fontWeight="bold"
          fontSize={{ base: 'md', md: 'xl' }}
          ml="0.5rem"
        >
          SAP - Sistema de Automação de Procedimentos da Copin
        </Text>
      </Flex>
      <CurrentUserMenu />
    </Flex>
  )
}
