import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { useRef } from 'react'

import { BsCardChecklist, BsClipboardData, BsListCheck } from 'react-icons/bs'
import { FaVoteYea } from 'react-icons/fa'
import { FiCornerDownRight, FiHome } from 'react-icons/fi'

import { BiLogOut } from 'react-icons/bi'
import { actions, selectors, store, useSelector } from 'store'
import NavItem from './nav-item'
import NavSubItems from './nav-subitems'

import { AiOutlineClose, AiOutlineFileAdd, AiOutlineForm } from 'react-icons/ai'

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
  const btnRef = useRef(null)

  const procedimentosAbertos = useSelector(
    selectors.tipoProcedimento.getTipoProcedimentosAbertos
  )

  const isSidebarOpen = useSelector(state => state.session.isSidebarOpen)

  const handleLogout = () => {
    store.dispatch(actions.session.logout())
  }

  const closeSidebar = () => {
    store.dispatch(actions.session.closeSidebar())
  }

  return (
    <Drawer
      isOpen={isSidebarOpen}
      placement="left"
      onClose={closeSidebar}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent p={0}>
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
          >
            <Flex alignItems="center" mb="24px">
              <IconButton
                aria-label=""
                _focus={{ boxShadow: 'none' }}
                bgColor="transparent"
                _hover={{ bgColor: 'transparent' }}
                _active={{ bgColor: 'transparent' }}
                onClick={closeSidebar}
                ref={btnRef}
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
            <Box
              overflowY="scroll"
              h="calc(100vh - 220px)"
              w="100%"
              css={invisibleStyle}
            >
              <NavItem icon={FiHome} title="Página inicial" url="/" />
              <NavItem
                icon={BsCardChecklist}
                title="Meus procedimentos"
                url="/meus-procedimentos"
              />
              {procedimentosAbertos.length > 0 && (
                <NavSubItems
                  icon={BsListCheck}
                  title="Abrir Procedimento"
                  items={procedimentosAbertos.map(tipoProcedimento => ({
                    title: tipoProcedimento.nome,
                    url: `/novo-procedimento/${tipoProcedimento.id}`,
                    icon: FiCornerDownRight
                  }))}
                />
              )}
              <NavSubItems
                icon={BsListCheck}
                title="Coordenação"
                roles={['admin', 'coordenador']}
                items={[
                  {
                    title: 'Todos os procedimentos',
                    url: `/coordenacao/procedimentos`,
                    icon: BsCardChecklist
                  },
                  {
                    title: 'Estatísticas Gerais',
                    url: `/coordenacao/estatisticas`,
                    icon: BsClipboardData
                  }
                ]}
              />
              <NavItem
                icon={FaVoteYea}
                title="Homologação"
                url="/colegiado/procedimentos"
                roles={['admin', 'colegiado']}
              />
              <NavItem
                icon={AiOutlineFileAdd}
                title="Tipo de Procedimentos"
                url="/tipo-procedimentos"
                roles={['admin']}
              />
              <NavItem
                icon={AiOutlineForm}
                title="Formulários"
                url="/formularios"
                roles={['admin']}
              />
            </Box>
          </Flex>
          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            alignItems={'flex-start'}
            mb={4}
          >
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
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
