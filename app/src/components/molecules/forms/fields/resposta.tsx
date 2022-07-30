import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoResposta } from 'domain/types/campo-tipos'
import { debounce } from 'lodash'
import React from 'react'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoResposta>

export function CampoResposta(props: Props) {
  const { onUpdateResposta, ...paragrafoProps } = props

  const handleChangeResposta = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateResposta(paragrafoProps.ordem, ev.target.value)
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
        onChange={handleChangeResposta}
      />
    </Box>
  )
}
