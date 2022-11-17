import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoGrelhaVerificacao } from 'domain/types/campo-tipos'
import { Controller, useFormContext } from 'react-hook-form'
import { CampoProps } from '..'
import { BaseCampoGrelhaVerificacao } from './base'

type Props = CampoProps & CampoFormulario<CampoTipoGrelhaVerificacao>

export function CampoGrelhaVerificacao(props: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={`field${props.ordem}`}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => {
        return (
          <BaseCampoGrelhaVerificacao
            {...props}
            isInvalid={error?.type === 'isRequired'}
            name={name}
            campo={value}
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
