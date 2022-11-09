import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoData } from 'domain/types/campo-tipos'
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { debounce } from 'lodash'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { BaseCampoProps } from '.'
import { ErrorWrapper } from './error-wrapper'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoData>

export function CampoData({ onUpdateResposta, formulario, ...props }: Props) {
  const { setError, clearErrors } = useFormContext()
  const campo = useGetValorCampo(formulario, props.ordem)

  const fieldName = `field${props.ordem}`

  const handleChangeData = debounce(
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

  return (
    <ErrorWrapper fieldName={fieldName}>
      <CampoParagrafo {...props} />
      <Input
        mt="16px"
        size="sm"
        type="date"
        placeholder="Resposta"
        maxW="fit-content"
        disabled={!props.editable}
        defaultValue={campo?.valor}
        onChange={handleChangeData}
      />
    </ErrorWrapper>
  )
}
