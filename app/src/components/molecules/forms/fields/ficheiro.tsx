import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Text
} from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoFicheiro } from 'domain/types/campo-tipos'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { AiOutlineClose, AiOutlineUpload } from 'react-icons/ai'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoFicheiro>

export function CampoFicheiro(props: Props) {
  const { setValue, watch } = useFormContext()

  const addedFiles: File[] = watch(`campo ${props.ordem}`) || []

  const ref = useRef<HTMLInputElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, ...paragrafoProps } = props
  const { quantidade_arquivos } = props.configuracao_campo

  function handleUpload(fileInput: React.ChangeEvent<HTMLInputElement>) {
    const files = fileInput.target.files
      ? Array.from(fileInput.target.files)
      : []

    setValue(`campo ${props.ordem}`, files)

    if (ref.current?.value) {
      ref.current.value = ''
    }
  }

  function handleRemove(file: File) {
    const filteredFiles = addedFiles.filter(f => f.name !== file.name)

    setValue(`campo ${props.ordem}`, filteredFiles)
  }

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      {addedFiles.length > 0 && (
        <Box mt="16px">
          {addedFiles.map(file => (
            <Flex alignItems="center">
              <Text lineHeight="32px" fontSize="12px">
                {file.name}
              </Text>
              <IconButton
                onClick={() => handleRemove(file)}
                variant="unstyled"
                size="sm"
                aria-label=""
                icon={<Icon as={AiOutlineClose} color="info.error" />}
              />
            </Flex>
          ))}
        </Box>
      )}
      <Button
        mt="16px"
        aria-label=""
        size="sm"
        color="initial.white"
        bgColor="primary.dark"
        fontSize="14px"
        _hover={{ bgColor: 'primary.default' }}
        onClick={() => ref.current?.click()}
        leftIcon={<Icon as={AiOutlineUpload} />}
      >
        Adicionar arquivo
      </Button>
      <Input
        visibility="hidden"
        ref={ref}
        onChange={handleUpload}
        type="file"
        multiple={quantidade_arquivos > 1}
        maxW="fit-content"
      />
    </Box>
  )
}
