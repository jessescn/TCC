import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import FormInput from 'components/molecules/forms/input'
import SimpleTable from 'components/organisms/simple-table'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { AiFillEdit } from 'react-icons/ai'
import { selectors, useSelector, store, actions } from 'store'
import { UpdateForm } from 'services/forms'
import { FormModel } from 'domain/models/form'

export default function Forms() {
  const [currentPage, setCurrentPage] = useState(1)
  const [term, setTerm] = useState('')

  const forms = useSelector(state =>
    selectors.form.getFormsBySearch(state)(term)
  )

  useEffect(() => {
    store.dispatch(actions.form.list())
  }, [])

  const handleDelete = (id: number) => {
    store.dispatch(actions.form.delete(id))
  }

  const handleUpdate = (id: number, data: UpdateForm) => {
    store.dispatch(actions.form.update({ id, data }))
  }

  const getEditMenu = (form: FormModel) => {
    const statusLabel = form.status === 'ativo' ? 'Inativar' : 'Ativar'
    const nextStatus = form.status === 'ativo' ? 'inativo' : 'ativo'

    return (
      <Menu>
        <MenuButton
          as={IconButton}
          variant="unstyled"
          size="lg"
          icon={<Icon as={AiFillEdit} />}
        />
        <MenuList>
          <MenuItem>Editar</MenuItem>
          {form.status !== 'rascunho' && (
            <MenuItem
              onClick={() =>
                handleUpdate(form.id, { ...form, status: nextStatus })
              }
            >
              {statusLabel}
            </MenuItem>
          )}
          <MenuItem onClick={() => handleDelete(form.id)}>Excluir</MenuItem>
        </MenuList>
      </Menu>
    )
  }

  const handleSearch = (termo: string) => {
    setCurrentPage(1)
    setTerm(termo)
  }

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      handleSearch(term)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [term])

  return (
    <Screen py="24px">
      <Box
        w="100%"
        h="100%"
        maxW="1392px"
        bgColor="initial.white"
        borderRadius="8px"
        px="24px"
        py="32px"
      >
        <Box>
          <Text fontWeight="bold" fontSize="28px" color="primary.dark">
            Formulários
          </Text>
          <Text my="16px" fontSize="14px">
            Crie um modelo de formulário para utilizar em processos
          </Text>
        </Box>
        <Divider my="24px" borderColor="secondary.dark" />
        <Flex justifyContent="space-between" alignItems="flex-end">
          <FormInput
            id="search"
            maxW="365px"
            height="35px"
            fontSize="14px"
            placeholder="Ex.Busca por ID, nome, autor e status"
            onChange={e => handleSearch(e.target.value)}
            label={{
              text: 'Buscar formulários',
              props: {
                htmlFor: 'search',
                fontSize: '14px',
                fontWeight: 'bold'
              }
            }}
          />
          <Button
            color="initial.white"
            bgColor="primary.dark"
            fontSize="14px"
            _hover={{ bgColor: 'primary.default' }}
          >
            Novo Formulário
          </Button>
        </Flex>
        <Box
          mt="24px"
          borderColor="secondary.dark"
          borderWidth="1px"
          borderRadius="8px"
          p="16px"
        >
          <SimpleTable
            currentPage={currentPage}
            totalPages={Math.ceil(forms.length / 5)}
            onChangePage={setCurrentPage}
            columns={[
              { content: 'ID', props: { width: '10%' } },
              { content: 'Nome', props: { width: '60%' } },
              { content: 'Status', props: { width: '10%' } },
              { content: 'Criado em', props: { width: '15%' } },
              { content: '', props: { width: '5%' } }
            ]}
            rows={forms.map(form => [
              { content: form.id },
              { content: form.name },
              { content: form.status },
              {
                content: format(new Date(form.createdAt || ''), 'dd/MM/yyyy')
              },
              { content: getEditMenu(form) }
            ])}
          />
        </Box>
      </Box>
    </Screen>
  )
}
