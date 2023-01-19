import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { actions, store, useSelector } from 'store'
import { DataFetched } from 'store/ducks/analise-dados'

type ModalProps = {
  isOpen: boolean
  data: DataFetched
  onClose: () => void
}

export default function GraphFiltersModal(props: ModalProps) {
  const { handleSubmit, register } = useForm({
    defaultValues: props.data.filtros
  })
  const status = useSelector(state => state.analiseDados.fetchStatus)

  function onSubmit(data: any) {
    store.dispatch(
      actions.analiseDados.fetchData({ ...props.data, filtros: data })
    )
  }

  useEffect(() => {
    if (status === 'success') {
      store.dispatch(actions.analiseDados.resetStatus())
      props.onClose()
    }
  }, [status])

  return (
    <Modal {...props} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="xl">Editar Filtros</Text>
        </ModalHeader>
        <ModalBody height="fit-content">
          <form id="form-filtros" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="1rem">
              <Flex alignItems="center">
                <Text fontSize="sm" w="20%">
                  Data Início
                </Text>
                <Input size="sm" type="date" {...register('dataInicio')} />
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="sm" w="20%">
                  Data Fim
                </Text>
                <Input size="sm" type="date" {...register('dataFim')} />
              </Flex>
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={status === 'loading'}
            form="form-filtros"
            type="submit"
            size="sm"
          >
            Aplicar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
