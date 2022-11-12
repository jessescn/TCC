import { Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoHora } from 'domain/types/campo-tipos'
import { debounce } from 'lodash'
import { BaseCampoProps } from '..'
import { ErrorWrapper } from '../error-wrapper'
import { CampoParagrafo } from '../paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoHora>

export function BaseCampoHora({ onChange, campo, isInvalid, ...props }: Props) {
  const handleChangeHora = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ordem: props.ordem, valor: ev.target.value })
    },
    400
  )

  return (
    <ErrorWrapper isInvalid={isInvalid} message="Campo hora não pode ser vazio">
      <CampoParagrafo {...props} />
      <Input
        mt="16px"
        disabled={!props.editable}
        _disabled={{ opacity: 0.5 }}
        _invalid={{ borderColor: 'info.error' }}
        size="sm"
        type="time"
        placeholder="Resposta"
        maxW="fit-content"
        isInvalid={isInvalid}
        defaultValue={campo?.valor}
        onChange={handleChangeHora}
      />
    </ErrorWrapper>
  )
}
