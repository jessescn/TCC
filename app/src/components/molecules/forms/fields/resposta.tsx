import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoResposta } from 'domain/types/campo-tipos'
import { CampoParagrafo } from './patagrafo'

type Props = CampoFormulario<CampoTipoResposta>

export function CampoResposta(props: Props) {
  return (
    <Box>
      <CampoParagrafo {...props} />
      <Input
        variant="unstyled"
        placeholder="Resposta"
        borderBottom="1px solid #BCBCBC"
        borderRadius={0}
      />
    </Box>
  )
}
