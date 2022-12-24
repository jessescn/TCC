import { Avatar, Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { actions, selectors, store, useSelector } from 'store'

export default function Header() {
  const currentUser = useSelector(selectors.session.getCurrentUser)

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
          fontSize={{ base: 'md', md: '2xl' }}
          ml="0.5rem"
        >
          Computação UFCG
        </Text>
      </Flex>
      <Flex align="center">
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
    </Flex>
  )
}
