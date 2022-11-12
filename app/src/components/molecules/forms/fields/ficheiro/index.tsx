import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoFicheiro } from 'domain/types/campo-tipos'
import { Controller, useFormContext } from 'react-hook-form'
import { CampoProps } from '..'
import { BaseCampoFicheiro } from './base'

type Props = CampoProps & CampoFormulario<CampoTipoFicheiro>

export function CampoFicheiro(props: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={`field${props.ordem}`}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => {
        return (
          <BaseCampoFicheiro
            {...props}
            campo={value}
            isInvalid={error?.type === 'isRequired'}
            name={name}
            onChange={e => {
              props.onUpdateResposta && props.onUpdateResposta(e)
              onChange(e)
            }}
          />
        )
      }}
      rules={{
        validate: {
          isRequired: e => {
            const isValid = !props.obrigatorio || (e?.valor || []).length > 0

            return isValid
          }
        }
      }}
    />
  )
}
