import {
  Avatar,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { useState } from 'react'

import { motion } from 'framer-motion'
import { BsCardChecklist, BsListCheck } from 'react-icons/bs'
import { FaWpforms } from 'react-icons/fa'
import { FiCornerDownRight, FiHome, FiUser } from 'react-icons/fi'

import { BiLogOut } from 'react-icons/bi'
import { actions, selectors, store, useSelector } from 'store'
import NavItem from './nav-item'
import NavSubItems from './nav-subitems'

import { AiOutlineClose } from 'react-icons/ai'

export const invisibleStyle = {
  '&::-webkit-scrollbar': {
    width: '0px'
  },
  '&::-webkit-scrollbar-track': {
    width: '0px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'transparent'
  }
}

const Sidebar = () => {
  const currentUser = useSelector(selectors.session.getCurrentUser)

  const isSidebarOpen = useSelector(state => state.session.isSidebarOpen)
  const [hidden, setHidden] = useState(!isSidebarOpen)

  const handleLogout = () => {
    store.dispatch(actions.session.logout())
  }

  const closeSidebar = () => {
    store.dispatch(actions.session.closeSidebar())
  }

  return (
    <motion.div
      hidden={hidden}
      initial={false}
      onAnimationStart={() => setHidden(false)}
      onAnimationComplete={() => setHidden(!isSidebarOpen)}
      animate={{ width: isSidebarOpen ? 300 : 0 }}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'absolute',
        left: '0',
        height: '100vh',
        top: '0',
        zIndex: 10,
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.2)'
      }}
    >
      <Flex
        bgColor="initial.white"
        pos="sticky"
        h="100vh"
        w={'300px'}
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex
          p="16px"
          flexDir="column"
          w="100%"
          alignItems={'flex-start'}
          as="nav"
          overflowY="auto"
          css={invisibleStyle}
        >
          <Flex alignItems="center" mb="24px">
            <IconButton
              aria-label=""
              bgColor="transparent"
              _hover={{ bgColor: 'transparent' }}
              _active={{ bgColor: 'transparent' }}
              onClick={closeSidebar}
              icon={
                <Icon
                  fontSize="24px"
                  as={AiOutlineClose}
                  color="primary.dark"
                />
              }
            />
            <Text
              color="primary.dark"
              fontWeight="bold"
              fontSize={{ base: '16px', md: '24px' }}
              ml="8px"
            >
              Computação UFCG
            </Text>
          </Flex>
          <NavItem icon={FiHome} title="Página inicial" url="/" />
          <NavItem
            icon={BsCardChecklist}
            title="Meus processos"
            url="/meus-processos"
          />
          <NavSubItems
            icon={BsListCheck}
            title="Novo Processo"
            items={[
              {
                title: 'Homologacão de banca examinadora (mestrado)',
                url: '/novo-processo',
                icon: FiCornerDownRight
              },
              {
                title: 'Homologacão de banca examinadora (doutorado)',
                url: '/novo-processo',
                icon: FiCornerDownRight
              }
            ]}
          />
          <NavItem
            icon={FaWpforms}
            title="Formulários"
            url="/formularios"
            adminOnly
          />
          <NavItem icon={FiUser} title="Usuários" url="/usuarios" adminOnly />
          <NavItem
            icon={BsCardChecklist}
            url="/processos"
            title="Processos - Curso"
            adminOnly
          />
        </Flex>
        <Flex p="5%" flexDir="column" w="100%" alignItems={'flex-start'} mb={4}>
          <Divider display={'flex'} />
          <Flex mt={4} align="center" w="100%">
            <Avatar size="sm" name={currentUser?.nome || ''} />
            <Flex justifyContent="space-between" w="100%">
              <Flex flexDir="column" ml={4} display={'flex'}>
                <Heading as="h3" size="sm">
                  {currentUser?.nome}
                </Heading>
                <Text color="gray" fontSize="14px">
                  {currentUser?.email}
                </Text>
              </Flex>
              <Tooltip label="Sair">
                <IconButton
                  onClick={handleLogout}
                  bgColor="#fff"
                  aria-label=""
                  icon={<Icon as={BiLogOut} />}
                />
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  )
}

export default Sidebar