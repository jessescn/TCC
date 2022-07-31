import { FormularioModel } from 'domain/models/formulario'
import { Resposta } from 'domain/models/processo'
import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { NovoProcesso } from 'services/processos'
import { actions, store } from 'store'
import Footer from './footer'
import RenderFormulario from './render-formulario'

type Props = {
  formularios: FormularioModel[]
  tipoProcesso: TipoProcessoModel
}

export type Processo = {
  tipo: number
  respostas: Resposta[]
}

export default function Content({ formularios, tipoProcesso }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const methods = useForm<Processo>({
    defaultValues: {
      tipo: tipoProcesso.id,
      respostas: formularios.map(formulario => ({
        campos: [],
        formulario: formulario.id
      }))
    }
  })

  const { getValues, setValue } = methods

  function onSubmit(data: Processo) {
    const novoProcesso: NovoProcesso = {
      ...data
    }

    store.dispatch(actions.processo.create(novoProcesso))
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
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
