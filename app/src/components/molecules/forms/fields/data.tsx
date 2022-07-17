import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoData } from 'domain/types/campo-tipos'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoData>

export function CampoData(props: Props) {
  const { register, ...paragrafoProps } = props

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      <Input
        type="date"
        placeholder="Resposta"
        maxW="fit-content"
        {...register}
      />
    </Box>
  )
}
