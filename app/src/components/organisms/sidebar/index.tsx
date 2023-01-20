import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Text
} from '@chakra-ui/react'
import { useMemo, useRef } from 'react'

import { BsCardChecklist, BsClipboardData } from 'react-icons/bs'
import { FiCornerDownRight, FiHome, FiUsers } from 'react-icons/fi'

import { ImInsertTemplate } from 'react-icons/im'

import { actions, selectors, store, useSelector } from 'store'
import NavItem from './nav-item'
import NavSubItems from './nav-subitems'

import { IconType } from 'react-icons'
import { AiOutlineClose, AiOutlineFileAdd } from 'react-icons/ai'
import { HiTemplate } from 'react-icons/hi'
import { MdApproval } from 'react-icons/md'
import { invisibleStyle } from 'style/scroll'
import { PermissionScope } from 'domain/entity/actor'

export type SidebarElement = {
  icon: IconType
  title: string
  url?: string
  items?: SidebarElement[]
  permissions: PermissionScope[]
}

const Sidebar = () => {
  const btnRef = useRef(null)

  const procedimentosAbertos = useSelector(
    selectors.session.getOpenProcedimentos
  )

  const isSidebarOpen = useSelector(state => state.session.isSidebarOpen)

  const closeSidebar = () => {
    store.dispatch(actions.session.closeSidebar())
  }

  const getProcedimentoAbertosItems: SidebarElement[] = useMemo(
    () =>
      procedimentosAbertos.map(tipoProcedimento => ({
        title: tipoProcedimento.nome,
        url: `/novo-procedimento/${tipoProcedimento.id}`,
        icon: FiCornerDownRight,
        permissions: []
      })),
    [procedimentosAbertos]
  )

  const items: SidebarElement[] = [
    {
      icon: FiHome,
      title: 'Página Inicial',
      url: '/',
      permissions: []
    },
    {
      icon: BsCardChecklist,
      title: 'Meus Procedimentos',
      url: '/meus-procedimentos',
      permissions: []
    },
    {
      icon: AiOutlineFileAdd,
      title: 'Abrir Procedimento',
      items: getProcedimentoAbertosItems,
      permissions: []
    },
    {
      icon: MdApproval,
      title: 'Homologação',
      url: '/colegiado/procedimentos',
      permissions: [{ name: 'colegiado_read', scope: 'all' }]
    },
    {
      icon: BsCardChecklist,
      title: 'Todos os Procedimentos',
      url: '/coordenacao/procedimentos',
      permissions: [
        { name: 'procedimento_read', scope: 'all' },
        { name: 'tipo_procedimento_create', scope: 'all' },
        { name: 'formulario_create', scope: 'all' }
      ]
    },
    {
      icon: HiTemplate,
      title: 'Tipo de Procedimentos',
      url: '/tipo-procedimentos',
      permissions: [{ name: 'tipo_procedimento_create', scope: 'all' }]
    },
    {
      icon: ImInsertTemplate,
      title: 'Formulários',
      url: '/formularios',
      permissions: [{ name: 'formulario_create', scope: 'all' }]
    },
    {
      icon: FiUsers,
      title: 'Gerenciamento Usuários',
      url: `/coordenacao/usuarios`,
      permissions: [{ name: 'actor_create', scope: 'all' }]
    },
    {
      icon: BsClipboardData,
      title: 'Estatísticas Gerais',
      url: `/coordenacao/estatisticas`,
      permissions: [{ name: 'analise_data_read', scope: 'all' }]
    }
  ]

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
              {items.map(navItem => {
                if (navItem.items) {
                  return <NavSubItems {...navItem} />
                }

                return <NavItem {...navItem} />
              })}
            </Box>
          </Flex>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
