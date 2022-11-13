import { FormularioModel } from 'domain/models/formulario'
import { Resposta } from 'domain/models/procedimento'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { NovoProcedimento } from 'services/procedimentos'
import { actions, store } from 'store'
import Footer from './footer'
import RenderFormulario from './render-formulario'

type Props = {
  formularios: FormularioModel[]
  tipoProcedimento: TipoProcedimentoModel
}

export type Procedimento = {
  tipo: number
  respostas: Resposta[]
}

export default function Content({ formularios, tipoProcedimento }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const methods = useForm<Procedimento>({
    defaultValues: {
      tipo: tipoProcedimento.id,
      respostas: formularios.map(formulario => ({
        campos: [],
        formulario: formulario.id
      }))
    }
  })

  const { getValues, setValue } = methods

  function onSubmit(data: Procedimento) {
    const novoProcedimento: NovoProcedimento = {
      ...data
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
  )
}
