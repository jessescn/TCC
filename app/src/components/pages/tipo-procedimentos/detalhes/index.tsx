import { Divider } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { actions, selectors, store, useSelector } from 'store'

import { Container } from 'components/atoms/container'
import { ContentHeader } from 'components/molecules/content-header'
import Configuration from 'components/pages/tipo-procedimentos/detalhes/configuration'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { NovoTipoProcedimento } from 'services/tipo-procedimentos'
import { formatISODateToLocalTime } from 'utils/format'
import Footer from './footer'

export default function TipoProcedimentoDetails() {
  const formControls = useForm()

  const loadForm = useRef(false)
  const tipoProcedimento = useSelector(
    selectors.tipoProcedimentoDetalhes.getTipoProcedimento
  )

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
      publicos: data.publicos || [],
      colegiado: data.colegiado === 'true' ? true : false,
      escopo: 'publico',
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
      escopo: 'publico',
      formularios: data.formularios,
      colegiado: data.colegiado === 'true' ? true : false,
      revisao_coordenacao: data.revisao_coordenacao === 'true' ? true : false,
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
    <Container>
      <FormProvider {...formControls}>
        <form onSubmit={formControls.handleSubmit(onSubmit)}>
          <ContentHeader
            title={
              tipoProcedimento
                ? 'Editar Tipo Procedimento'
                : 'Novo Tipo Procedimento'
            }
            identifier={tipoProcedimento?.id}
            updatedAt={tipoProcedimento?.updatedAt}
          />
          <Divider my="1.5rem" borderColor="secondary.dark" />
          <Configuration />
          <Footer />
        </form>
      </FormProvider>
    </Container>
  )
}
