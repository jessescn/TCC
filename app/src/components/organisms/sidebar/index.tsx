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
import { useRef } from 'react'

import { BsCardChecklist, BsClipboardData } from 'react-icons/bs'
import { FiCornerDownRight, FiHome, FiUsers } from 'react-icons/fi'
import { GrTemplate } from 'react-icons/gr'

import { ImInsertTemplate } from 'react-icons/im'

import { actions, selectors, store, useSelector } from 'store'
import NavItem from './nav-item'
import NavSubItems from './nav-subitems'

import { AiOutlineClose, AiOutlineFileAdd } from 'react-icons/ai'
import { MdApproval, MdOutlineManageAccounts } from 'react-icons/md'
import { invisibleStyle } from 'style/scroll'

const Sidebar = () => {
  const btnRef = useRef(null)

  const procedimentosAbertos = useSelector(
    selectors.session.getOpenProcedimentos
  )

  const isSidebarOpen = useSelector(state => state.session.isSidebarOpen)

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
              {procedimentosAbertos.length > 0 && (
                <NavSubItems
                  icon={AiOutlineFileAdd}
                  title="Abrir Procedimento"
                  items={procedimentosAbertos.map(tipoProcedimento => ({
                    title: tipoProcedimento.nome,
                    url: `/novo-procedimento/${tipoProcedimento.id}`,
                    icon: FiCornerDownRight
                  }))}
                />
              )}
              <NavItem
                icon={BsCardChecklist}
                title="Meus procedimentos"
                url="/meus-procedimentos"
              />
              <NavSubItems
                icon={MdOutlineManageAccounts}
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
                icon={MdApproval}
                title="Homologação"
                url="/colegiado/procedimentos"
                profiles={['admin', 'coordenacao', 'colegiado', 'secretaria']}
              />
              <NavItem
                icon={GrTemplate}
                title="Tipo de Procedimentos"
                url="/tipo-procedimentos"
                profiles={['admin', 'coordenacao']}
              />
              <NavItem
                icon={ImInsertTemplate}
                title="Formulários"
                url="/formularios"
                profiles={['admin', 'coordenacao']}
              />
            </Box>
          </Flex>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
