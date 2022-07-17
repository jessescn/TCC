import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoData } from 'domain/types/campo-tipos'
import { CampoParagrafo } from './patagrafo'

type Props = CampoFormulario<CampoTipoData>

export function CampoData(props: Props) {
  return (
    <Box>
      <CampoParagrafo {...props} />
      <Input type="date" placeholder="Resposta" maxW="fit-content" />
    </Box>
  )
}
