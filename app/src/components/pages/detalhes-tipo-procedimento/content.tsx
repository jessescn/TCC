import { Box, Divider } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

import Configuration from 'components/pages/detalhes-tipo-procedimento/configuration'
import Header from 'components/pages/detalhes-tipo-procedimento/header'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { NovoTipoProcedimento } from 'services/tipo-procedimentos'
import { formatISODate, formatISODateToLocalTime } from 'utils/format'
import Footer from './footer'

export default function Content() {
  const formControls = useForm()

  const [searchParams] = useSearchParams()

  const id = Number(searchParams.get('id'))

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
      dataInicio: formatISODateToLocalTime(tipoProcedimento.dataInicio),
      dataFim: formatISODateToLocalTime(tipoProcedimento.dataFim)
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
          <Footer tipoProcedimento={tipoProcedimento} />
        </form>
      </FormProvider>
    </Box>
  )
}
