import { Flex } from '@chakra-ui/react'
import { Resposta } from 'domain/models/procedimento'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { NovoProcedimento as NovoProcedimentoModel } from 'services/procedimentos'
import { actions, selectors, store, useSelector } from 'store'
import Footer from './footer'
import RenderFormulario from './render-formulario'

export type NovoProcedimentoForm = {
  tipo: number
  respostas: Resposta[]
}

export default function NovoProcedimento() {
  const [currentIdx, setCurrentIdx] = useState(0)

  const tipoProcedimento = useSelector(
    selectors.tipoProcedimentoDetalhes.getTipoProcedimento
  )
  const formularios = useSelector(
    selectors.tipoProcedimentoDetalhes.getFormulariosFromTipo
  )

  const methods = useForm<NovoProcedimentoForm>()

  const initialSet = useRef(false)

  useEffect(() => {
    if (initialSet.current || !tipoProcedimento) return

    methods.reset({
      tipo: tipoProcedimento?.id,
      respostas: formularios.map(formulario => ({
        campos: [],
        formulario: formulario.id
      }))
    })
    initialSet.current = true
  }, [tipoProcedimento])

  const { getValues, setValue } = methods

  function onSubmit(data: NovoProcedimentoForm) {
    const novoProcedimento: NovoProcedimentoModel = {
      respostas: data.respostas,
      tipo: data.tipo,
      votos: []
    }

    store.dispatch(actions.procedimento.create(novoProcedimento))
  }

  const handleSetCurrentIdx = useCallback(
    (idx: number) => {
      if (idx > formularios.length - 1 || idx < 0) {
        return
      }

      setCurrentIdx(idx)
    },
    [formularios, setCurrentIdx]
  )

  const handleClear = useCallback(() => {
    const formularioId = formularios[currentIdx]?.id

    const updated = getValues('respostas').filter(
      resposta => resposta.formulario !== formularioId
    )

    setValue('respostas', updated)
  }, [getValues, setValue])

  const isLastForm = currentIdx === formularios.length - 1

  return (
    <Flex w="100%" h="100%" maxW="900px" flexDir="column">
      <FormProvider {...methods}>
        <form id="novo-procedimento" onSubmit={methods.handleSubmit(onSubmit)}>
          {formularios[currentIdx] && (
            <RenderFormulario formulario={formularios[currentIdx]} />
          )}
          <Footer
            currentIdx={currentIdx}
            onChangeForm={handleSetCurrentIdx}
            onClear={handleClear}
            isLastForm={isLastForm}
          />
        </form>
      </FormProvider>
    </Flex>
  )
}
