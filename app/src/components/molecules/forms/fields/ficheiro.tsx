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
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { AiOutlineClose, AiOutlineUpload } from 'react-icons/ai'
import { BaseCampoProps } from '.'
import { ErrorWrapper } from './error-wrapper'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoFicheiro>

export function CampoFicheiro({
  onUpdateResposta,
  formulario,
  ...props
}: Props) {
  const { clearErrors, setError } = useFormContext()
  const campo = useGetValorCampo(formulario, props.ordem)

  const addedFiles: File[] = campo?.valor || []

  const fieldName = `field${props.ordem}`

  const ref = useRef<HTMLInputElement>(null)
  const { quantidade_arquivos } = props.configuracao_campo

  function handleUpload(fileInput: React.ChangeEvent<HTMLInputElement>) {
    const files = fileInput.target.files
      ? Array.from(fileInput.target.files)
      : []

    if (ref.current?.value) {
      ref.current.value = ''
    }

    onUpdateResposta({ ordem: props.ordem, valor: files })
  }

  function handleRemove(file: File) {
    const filteredFiles = addedFiles.filter(f => f.name !== file.name)
    onUpdateResposta({ ordem: props.ordem, valor: filteredFiles })
  }

  useEffect(() => {
    if (!props.obrigatorio || campo === undefined) return

    const isInvalid = addedFiles.length === 0

    if (isInvalid) {
      setError(fieldName, { message: 'Selecione ao menos um arquivo' })
    } else {
      clearErrors(fieldName)
    }
  }, [campo])

  return (
    <ErrorWrapper fieldName={fieldName}>
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
