import { Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoResposta } from 'domain/types/campo-tipos'
import { debounce } from 'lodash'
import React from 'react'
import { BaseCampoProps } from '..'
import { ErrorWrapper } from '../error-wrapper'
import { CampoParagrafo } from '../paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoResposta>

export function BaseCampoResposta({
  campo,
  onChange,
  isInvalid,
  ...props
}: Props) {
  const handleChangeResposta = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ordem: props.ordem, valor: ev.target.value })
    },
    400
  )

  return (
    <ErrorWrapper isInvalid={isInvalid} message="O campo não pode ser vazio">
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
