import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoResposta } from 'domain/types/campo-tipos'
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { debounce } from 'lodash'
import React from 'react'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoResposta>

export function CampoResposta(props: Props) {
  const { onUpdateResposta, formulario, ...paragrafoProps } = props

  const campo = useGetValorCampo(formulario, props.ordem)

  const handleChangeResposta = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateResposta({ ordem: paragrafoProps.ordem, valor: ev.target.value })
    },
    400
  )

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      <Input
        mt="24px"
        size="sm"
        variant="unstyled"
        placeholder="Resposta"
        borderBottom="1px solid #BCBCBC"
        borderRadius={0}
        defaultValue={campo?.valor}
        onChange={handleChangeResposta}
      />
    </Box>
  )
}
