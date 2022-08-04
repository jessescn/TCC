import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoData } from 'domain/types/campo-tipos'
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { debounce } from 'lodash'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoData>

export function CampoData({ onUpdateResposta, formulario, ...props }: Props) {
  const campo = useGetValorCampo(formulario, props.ordem)

  const handleChangeData = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateResposta({ ordem: props.ordem, valor: ev.target.value })
    },
    400
  )

  return (
    <Box>
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
    </Box>
  )
}
