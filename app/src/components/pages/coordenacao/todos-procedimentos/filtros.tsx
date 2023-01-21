import { Box, Input, Stack, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { MultipleSelect, SelectOption } from 'components/atoms/multiple-select'
import { statusList } from 'domain/models/procedimento'
import { useForm } from 'react-hook-form'
import { actions, selectors, store, useSelector } from 'store'

type StatusKey = keyof typeof statusList

export default function Filtros() {
  const isLoading = useSelector(selectors.procedimento.isLoadingContent)
  const pagination = useSelector(selectors.procedimento.getPagination)

  const form = useForm()

  const statusOptions: SelectOption[] = Object.keys(statusList).map(status => ({
    label: statusList[status as StatusKey].label,
    value: status
  }))

  function handleSearch(data: any) {
    store.dispatch(
      actions.procedimento.list({
        ...pagination,
        ...data,
        page: 1
      })
    )
  }

  return (
    <form id="filters-form" onSubmit={form.handleSubmit(handleSearch)}>
      <Stack
        display="flex"
        alignItems="flex-end"
        direction="row"
        spacing="0.5rem"
      >
        <Box>
          <Text fontSize="sm">Busca</Text>
          <Input
            id="search"
            w="300px"
            height="2.375rem"
            fontSize="sm"
            placeholder="Ex.Busca por ID ou nome"
            {...form.register('term')}
          />
        </Box>
        <Box>
          <Text fontSize="sm">Data Início</Text>
          <Input
            h="38px"
            w="190px"
            size="sm"
            type="date"
            {...form.register('dataInicio')}
          />
        </Box>
        <Box>
          <Text fontSize="sm">Data Fim</Text>
          <Input
            h="38px"
            w="190px"
            size="sm"
            type="date"
            {...form.register('dataFim')}
          />
        </Box>
        <Box w="400px">
          <Text fontSize="sm">Status</Text>
          <MultipleSelect
            onChange={e => {
              const values = (e as SelectOption[]).map(option => option.value)
              form.setValue('status', values)
            }}
            isMulti
            options={statusOptions}
          />
        </Box>
        <Button isLoading={isLoading} form="filters-form" type="submit">
          Buscar
        </Button>
      </Stack>
    </form>
  )
}
