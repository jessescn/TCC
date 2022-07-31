import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoData } from 'domain/types/campo-tipos'
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { debounce } from 'lodash'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoData>

export function CampoData(props: Props) {
  const { onUpdateResposta, formulario, ...paragrafoProps } = props

  const campo = useGetValorCampo(formulario, props.ordem)

  const handleChangeData = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateResposta({ ordem: paragrafoProps.ordem, valor: ev.target.value })
    },
    400
  )

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      <Input
        mt="16px"
        size="sm"
        type="date"
        placeholder="Resposta"
        maxW="fit-content"
        defaultValue={campo?.valor}
        onChange={handleChangeData}
      />
    </Box>
  )
}
