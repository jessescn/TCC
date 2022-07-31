import { Processo } from 'domain/entity/processo'
import { FormularioModel } from 'domain/models/formulario'
import { Resposta } from 'domain/models/processo'
import { useFormContext } from 'react-hook-form'

export const useGetValorCampo = (
  formulario: FormularioModel,
  ordem: number
) => {
  const { watch } = useFormContext()

  const respostas: Resposta[] = watch('respostas') || []
  console.log(respostas)

  const campo = Processo.getCampoByFormulario(respostas, formulario.id, ordem)

  return campo
}
