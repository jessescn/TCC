import { Box, Button, Divider, Flex } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

import Configuration from 'components/pages/tipo-procedimento/configuration'
import Header from 'components/pages/tipo-procedimento/header'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { NovoTipoProcedimento } from 'services/tipo-procedimentos'
import { formatISODate } from 'utils/format'

export default function Content() {
  const navigate = useNavigate()
  const formControls = useForm()

  const [searchParams] = useSearchParams()

  const id = Number(searchParams.get('id'))

  const status = useSelector(state => state.tipoProcedimento.statusUpdate)

  const loadForm = useRef(false)
  const tipoProcedimento = !isNaN(id)
    ? useSelector(selectors.tipoProcedimento.getTipoProcedimento)(id)
    : undefined

  useEffect(() => {
    if (!tipoProcedimento || loadForm.current) {
      return
    }

    formControls.reset({
      ...tipoProcedimento,
      colegiado: String(tipoProcedimento.colegiado),
      dataInicio: formatISODate(tipoProcedimento.dataInicio),
      dataFim: formatISODate(tipoProcedimento.dataFim)
    })
    loadForm.current = true
  }, [tipoProcedimento])

  function handleCreate(data: any) {
    const novoTipoProcedimento: NovoTipoProcedimento = {
      ...data,
      colegiado: data.colegiado === 'true' ? true : false,
      dataFim: data.dataFim
        ? new Date(data.dataFim).toISOString()
        : data.dataFim,
      dataInicio: data.dataInicio
        ? new Date(data.dataInicio).toISOString()
        : data.dataInicio
    }

    store.dispatch(actions.tipoProcedimento.create(novoTipoProcedimento))
  }

  function handleUpdate(data: any) {
    if (!tipoProcedimento) {
      return
    }

    const updateTipoProcedimento: Partial<TipoProcedimentoModel> = {
      nome: data.nome,
      descricao: data.descricao,
      status: data.status,
      escopo: data.escopo,
      formularios: data.formularios,
      colegiado: data.colegiado === 'true' ? true : false,
      publicos: data.publicos,
      dataFim: data.dataFim
        ? new Date(data.dataFim).toISOString()
        : data.dataFim,
      dataInicio: data.dataInicio
        ? new Date(data.dataInicio).toISOString()
        : data.dataInicio
    }

    store.dispatch(
      actions.tipoProcedimento.update({
        id: tipoProcedimento.id,
        data: updateTipoProcedimento
      })
    )
  }

  function onSubmit(data: any) {
    if (!tipoProcedimento) {
      handleCreate(data)
      return
    }

    handleUpdate(data)
  }

  useEffect(() => {
    if (status === 'success') {
      store.dispatch(actions.tipoProcedimento.resetStatus())
      navigate('/tipo-procedimentos')
    }
  }, [status])

  const formularios = formControls.watch('formularios', []) as number[]
  const isTipoProcedimentoInvalido = (formularios || []).length === 0

  return (
    <Box
      w="100%"
      h="100%"
      maxW="1200px"
      bgColor="initial.white"
      borderRadius="8px"
      px="24px"
      py="32px"
    >
      <FormProvider {...formControls}>
        <form onSubmit={formControls.handleSubmit(onSubmit)}>
          <Header tipo={tipoProcedimento} />
          <Divider my="24px" borderColor="secondary.dark" />
          <Configuration tipoProcedimento={tipoProcedimento} />
          <Flex justifyContent="flex-end">
            <Button
              bgColor="initial.white"
              borderColor="primary.dark"
              borderWidth={1}
              color="primary.dark"
              size="sm"
              mr="8px"
              mt="16px"
              onClick={() => navigate('/tipo-procedimentos')}
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
              isDisabled={isTipoProcedimentoInvalido}
            >
              Salvar
            </Button>
          </Flex>
        </form>
      </FormProvider>
    </Box>
  )
}
