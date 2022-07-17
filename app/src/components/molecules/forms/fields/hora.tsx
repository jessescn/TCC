import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoHora } from 'domain/types/campo-tipos'
import { CampoParagrafo } from './patagrafo'

type Props = CampoFormulario<CampoTipoHora>

export function CampoHora(props: Props) {
  return (
    <Box>
      <CampoParagrafo {...props} />
      <Input type="time" placeholder="Resposta" maxW="fit-content" />
    </Box>
  )
}
