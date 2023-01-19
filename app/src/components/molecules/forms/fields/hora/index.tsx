import { CampoFormulario, CampoTipoHora } from 'domain/models/formulario'
import { Controller, useFormContext } from 'react-hook-form'
import { CampoProps } from '..'
import { BaseCampoHora } from './base'

type Props = CampoProps & CampoFormulario<CampoTipoHora>

export function CampoHora(props: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={`field${props.ordem}`}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => {
        return (
          <BaseCampoHora
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
            const isValid =
              !props.obrigatorio || String(e?.valor || '').trim().length > 0

            return isValid
          }
        }
      }}
    />
  )
}
