import { Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoResposta } from 'domain/types/campo-tipos'
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { debounce } from 'lodash'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { BaseCampoProps } from '.'
import { ErrorWrapper } from './error-wrapper'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoResposta>

export function CampoResposta({
  onUpdateResposta,
  formulario,
  ...props
}: Props) {
  const { setError, clearErrors } = useFormContext()
  const campo = useGetValorCampo(formulario, props.ordem)
  const fieldName = `field${props.ordem}`

  const handleChangeResposta = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateResposta({ ordem: props.ordem, valor: ev.target.value })
    },
    400
  )

  useEffect(() => {
    if (!props.obrigatorio) return

    const isInvalid = String(campo?.valor).trim() === ''

    if (isInvalid) {
      setError(fieldName, { message: 'Campo obrigatório' })
    } else {
      clearErrors(fieldName)
    }
  }, [campo])

  const isInvalid = props.obrigatorio
    ? String(campo?.valor).trim() === ''
    : false

  return (
    <ErrorWrapper fieldName={fieldName}>
      <CampoParagrafo {...props} />
      <Input
        mt="24px"
        size="sm"
        disabled={!props.editable}
        variant="unstyled"
        placeholder="Resposta"
        borderBottom={`1px solid ${isInvalid ? 'red' : '#BCBCBC'}`}
        borderRadius={0}
        defaultValue={campo?.valor}
        onChange={handleChangeResposta}
      />
    </ErrorWrapper>
  )
}
