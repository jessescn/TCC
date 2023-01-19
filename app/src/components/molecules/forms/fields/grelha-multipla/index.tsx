import {
  CampoFormulario,
  CampoTipoGrelhaMultipla
} from 'domain/models/formulario'
import { Controller, useFormContext } from 'react-hook-form'
import { CampoProps } from '..'
import { BaseCampoGrelhaMultipla } from './base'

type Props = CampoProps & CampoFormulario<CampoTipoGrelhaMultipla>

export function CampoGrelhaMultipla(props: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={`field${props.ordem}`}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => {
        return (
          <BaseCampoGrelhaMultipla
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
            const numberOfRows = props.configuracao_campo.opcoes.linhas.length

            const isValid =
              !props.obrigatorio || (e?.valor || []).length === numberOfRows

            return isValid
          }
        }
      }}
    />
  )
}
