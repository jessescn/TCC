import { Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { actions, store } from 'store'

export default function Header() {
  const toggleSidebar = () => {
    store.dispatch(actions.session.toggleSidebar())
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
        <IconButton
          _focus={{ boxShadow: 'none' }}
          aria-label=""
          bgColor="transparent"
          _hover={{ bgColor: 'transparent' }}
          _active={{ bgColor: 'transparent' }}
          onClick={toggleSidebar}
          icon={
            <Icon
              fontSize={{ base: '18px', md: '24px' }}
              as={HiMenuAlt1}
              color="initial.white"
            />
          }
        />
        <Text
          color="initial.white"
          fontWeight="bold"
          fontSize={{ base: '16px', md: '24px' }}
          ml="8px"
        >
          Computação UFCG
        </Text>
      </Flex>
    </Flex>
  )
}
