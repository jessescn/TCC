import { Procedimento } from 'domain/entity/procedimento'
import { FormularioModel } from 'domain/models/formulario'
import { Resposta } from 'domain/models/procedimento'
import { useFormContext } from 'react-hook-form'

export const useGetValorCampo = (
  formulario: FormularioModel,
  ordem: number
) => {
  const { watch } = useFormContext()

  const respostas: Resposta[] = watch('respostas') || []

  const campo = Procedimento.getCampoByFormulario(
    respostas,
    formulario.id,
    ordem
  )

  return campo
}
