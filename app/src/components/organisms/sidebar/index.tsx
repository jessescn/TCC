import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { useRef } from 'react'

import { BsCardChecklist, BsClipboardData, BsListCheck } from 'react-icons/bs'
import { FaVoteYea } from 'react-icons/fa'
import { FiCornerDownRight, FiHome, FiUsers } from 'react-icons/fi'

import { BiLogOut } from 'react-icons/bi'
import { actions, selectors, store, useSelector } from 'store'
import NavItem from './nav-item'
import NavSubItems from './nav-subitems'

import { AiOutlineClose, AiOutlineFileAdd, AiOutlineForm } from 'react-icons/ai'
import { invisibleStyle } from 'style/scroll'

const Sidebar = () => {
  const btnRef = useRef(null)

  const procedimentosAbertos = useSelector(
    selectors.session.getOpenProcedimentos
  )

  const isSidebarOpen = useSelector(state => state.session.isSidebarOpen)

  const handleLogout = () => {
    store.dispatch(actions.session.logout({ reload: true }))
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
            as="nav"
            w="100%"
            p="0.75rem 1rem"
            flexDir="column"
            alignItems={'flex-start'}
          >
            <Flex alignItems="center">
              <IconButton
                aria-label="botão fechar sidebar"
                _focus={{ boxShadow: 'none' }}
                bgColor="transparent"
                _hover={{ bgColor: 'transparent' }}
                _active={{ bgColor: 'transparent' }}
                onClick={closeSidebar}
                ref={btnRef}
                icon={
                  <Icon
                    fontSize="2xl"
                    as={AiOutlineClose}
                    color="primary.dark"
                  />
                }
              />
              <Text
                color="primary.dark"
                fontWeight="bold"
                fontSize={{ base: 'md', md: '2xl' }}
                ml="0.5rem"
              >
                Computação UFCG
              </Text>
            </Flex>
            <Box
              w="100%"
              overflowY="scroll"
              h="calc(100vh - 110px)"
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
                profiles={['admin', 'coordenacao']}
                items={[
                  {
                    title: 'Todos os procedimentos',
                    url: `/coordenacao/procedimentos`,
                    icon: BsCardChecklist
                  },
                  {
                    title: 'Gerenciamento Usuários',
                    url: `/coordenacao/usuarios`,
                    icon: FiUsers
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
                profiles={['admin', 'coordenacao', 'colegiado']}
              />
              <NavItem
                icon={AiOutlineFileAdd}
                title="Tipo de Procedimentos"
                url="/tipo-procedimentos"
                profiles={['admin', 'coordenacao']}
              />
              <NavItem
                icon={AiOutlineForm}
                title="Formulários"
                url="/formularios"
                profiles={['admin', 'coordenacao']}
              />
            </Box>
          </Flex>
          <Flex
            px="1rem"
            mb="1rem"
            flexDir="column"
            w="100%"
            alignItems={'flex-start'}
          >
            <Tooltip label="Sair">
              <Button
                px="0.5rem"
                w="100%"
                onClick={handleLogout}
                bgColor="#fff"
                aria-label=""
                leftIcon={<Icon fontSize="lg" as={BiLogOut} />}
                justifyContent="flex-start"
              >
                Deslogar
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
