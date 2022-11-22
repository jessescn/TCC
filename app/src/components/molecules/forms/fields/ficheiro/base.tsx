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
import { AiOutlineClose, AiOutlineUpload } from 'react-icons/ai'
import { BaseCampoProps } from '..'
import { ErrorWrapper } from '../error-wrapper'
import { CampoParagrafo } from '../paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoFicheiro>

export function BaseCampoFicheiro({
  onChange,
  campo,
  isInvalid,
  ...props
}: Props) {
  const addedFiles: File[] = campo?.valor || []

  const ref = useRef<HTMLInputElement>(null)
  const { quantidade_arquivos } = props.configuracao_campo

  function handleUpload(fileInput: React.ChangeEvent<HTMLInputElement>) {
    const files = fileInput.target.files
      ? Array.from(fileInput.target.files)
      : []

    if (ref.current?.value) {
      ref.current.value = ''
    }

    onChange({ ordem: props.ordem, valor: files })
  }

  function handleRemove(file: File) {
    const filteredFiles = addedFiles.filter(f => f.name !== file.name)
    onChange({ ordem: props.ordem, valor: filteredFiles })
  }

  return (
    <ErrorWrapper isInvalid={isInvalid} message="Selecione ao menos um arquivo">
      <CampoParagrafo {...props} />
      {addedFiles.length > 0 && (
        <Box mt="16px">
          {addedFiles.map((file, idx) => (
            <Flex alignItems="center" key={`${file.name}-${idx}`}>
              <Text lineHeight="32px" fontSize="12px">
                {file.name}
              </Text>
              <IconButton
                onClick={() => handleRemove(file)}
                variant="unstyled"
                size="sm"
                aria-label=""
                icon={<Icon as={AiOutlineClose} color="info.error" />}
                isDisabled={!props.editable}
              />
            </Flex>
          ))}
        </Box>
      )}
      <Button
        mt="16px"
        aria-label=""
        disabled={!props.editable}
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
    </ErrorWrapper>
  )
}
