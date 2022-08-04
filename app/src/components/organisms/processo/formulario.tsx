import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { ProcessoModel } from 'domain/models/processo'
import { FormProvider, useForm } from 'react-hook-form'
import RenderFormulario from './render-formulario'

type Props = {
  formulario: FormularioModel
  processo: ProcessoModel
  invalidos: CampoFormulario[]
  editable?: boolean
  handleInvalidate?: (question: CampoFormulario) => void
}

export default function Formulario({
  formulario,
  processo,
  editable = false,
  invalidos,
  handleInvalidate
}: Props) {
  const methods = useForm({ defaultValues: { respostas: processo.respostas } })

  const updateResposta = (exemplo: any) => {
    console.log(exemplo)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(updateResposta)}>
        <RenderFormulario formulario={formulario} editable={editable} />
      </form>
    </FormProvider>
  )
}
