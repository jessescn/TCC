import { Input } from '@chakra-ui/react'
import { CampoFormulario, CampoTipoData } from 'domain/models/formulario'
import { debounce } from 'lodash'
import { BaseCampoProps } from '..'
import { ErrorWrapper } from '../error-wrapper'
import { CampoParagrafo } from '../paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoData>

export function BaseCampoData({ onChange, isInvalid, campo, ...props }: Props) {
  const handleChangeData = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ordem: props.ordem, valor: ev.target.value })
    },
    400
  )

  return (
    <ErrorWrapper isInvalid={isInvalid} message="Campo data não pode ser vazio">
      <CampoParagrafo {...props} />
      <Input
        mt="16px"
        size="sm"
        type="date"
        placeholder="Resposta"
        maxW="fit-content"
        _invalid={{ borderColor: 'info.error' }}
        isInvalid={isInvalid}
        disabled={!props.editable}
        defaultValue={campo?.valor}
        onChange={handleChangeData}
      />
    </ErrorWrapper>
  )
}
