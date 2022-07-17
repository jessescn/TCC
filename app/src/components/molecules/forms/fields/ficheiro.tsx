import { Box, Button, Icon, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoFicheiro } from 'domain/types/campo-tipos'
import { useRef } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoFicheiro>

export function CampoFicheiro(props: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const { register, ...paragrafoProps } = props
  const { quantidade_arquivos } = props.configuracao_campo

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      <Button
        aria-label=""
        onClick={() => ref.current?.click()}
        leftIcon={<Icon as={AiOutlineUpload} />}
      >
        Adicionar arquivo
      </Button>
      <Input
        visibility="hidden"
        {...register}
        ref={ref}
        type="file"
        multiple={quantidade_arquivos > 1}
        maxW="fit-content"
      />
    </Box>
  )
}
