import { Box, Button, Divider, Flex } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

import Content from 'components/pages/tipo-processo/content'
import Header from 'components/pages/tipo-processo/header'
import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { NovoTipoProcesso } from 'services/tipo-processos'
import { formatISODate } from 'utils/format'

export default function TipoProcesso() {
  const navigate = useNavigate()
  const formControls = useForm()

  const [searchParams] = useSearchParams()

  const id = Number(searchParams.get('id'))

  const status = useSelector(state => state.tipoProcesso.status)

  const loadForm = useRef(false)
  const tipoProcesso = !isNaN(id)
    ? useSelector(selectors.tipoProcesso.getTipoProcesso)(id)
    : undefined

  useEffect(() => {
    store.dispatch(actions.tipoProcesso.list())
    store.dispatch(actions.form.list())
  }, [])

  useEffect(() => {
    if (!tipoProcesso || loadForm.current) {
      return
    }

    formControls.reset({
      ...tipoProcesso,
      colegiado: String(tipoProcesso.colegiado),
      dataInicio: formatISODate(tipoProcesso.dataInicio),
      dataFim: formatISODate(tipoProcesso.dataFim)
    })
    loadForm.current = true
  }, [tipoProcesso])

  function handleCreate(data: any) {
    const novoTipoProcesso: NovoTipoProcesso = {
      ...data,
      colegiado: Boolean(data.colegiado),
      dataFim: data.dataFim
        ? new Date(data.dataFim).toISOString()
        : data.dataFim,
      dataInicio: data.dataInicio
        ? new Date(data.dataInicio).toISOString()
        : data.dataInicio
    }

    store.dispatch(actions.tipoProcesso.create(novoTipoProcesso))
  }

  function handleUpdate(data: any) {
    if (!tipoProcesso) {
      return
    }

    const updateTipoProcesso: TipoProcessoModel = {
      ...data,
      id: tipoProcesso.id,
      colegiado: data.colegiado === 'true' ? true : false,
      dataFim: data.dataFim
        ? new Date(data.dataFim).toISOString()
        : data.dataFim,
      dataInicio: data.dataInicio
        ? new Date(data.dataInicio).toISOString()
        : data.dataInicio
    }

    console.log(updateTipoProcesso)

    store.dispatch(
      actions.tipoProcesso.update({
        id: tipoProcesso.id,
        data: updateTipoProcesso
      })
    )
  }

  function onSubmit(data: any) {
    if (!tipoProcesso) {
      handleCreate(data)
      return
    }

    handleUpdate(data)
  }

  return (
    <Screen py="24px">
      <Box
        w="100%"
        h="100%"
        maxW="900px"
        bgColor="initial.white"
        borderRadius="8px"
        px="24px"
        py="32px"
      >
        <FormProvider {...formControls}>
          <form onSubmit={formControls.handleSubmit(onSubmit)}>
            <Header tipo={tipoProcesso} />
            <Divider my="24px" borderColor="secondary.dark" />
            <Content tipoProcesso={tipoProcesso} />
            <Flex justifyContent="flex-end">
              <Button
                isLoading={status === 'loading'}
                bgColor="initial.white"
                borderColor="primary.dark"
                borderWidth={1}
                color="primary.dark"
                size="sm"
                mr="8px"
                mt="16px"
                onClick={() => navigate('/tipo-processos')}
              >
                Voltar
              </Button>
              <Button
                isLoading={status === 'loading'}
                bgColor="primary.dark"
                color="initial.white"
                size="sm"
                mt="16px"
                type="submit"
              >
                Salvar
              </Button>
            </Flex>
          </form>
        </FormProvider>
      </Box>
    </Screen>
  )
}
