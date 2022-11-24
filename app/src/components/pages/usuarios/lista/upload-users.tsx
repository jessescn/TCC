import {
  Alert,
  AlertIcon,
  Center,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  AiOutlineCloudDownload,
  AiOutlineCloudUpload,
  AiOutlineFile,
  AiOutlineUpload
} from 'react-icons/ai'
import { actions, store, useSelector } from 'store'
import { downloadBlob } from 'utils/file'

type ErrorType = {
  type: string
  content: string
}

export const UploadUsers = () => {
  const [file, setFile] = useState<File | undefined>()
  const [errors, setErrors] = useState<ErrorType[]>([])
  const modalControls = useDisclosure()

  const status = useSelector(state => state.user.statusCreateBulk)

  const inputRef = useRef<any>(null)

  const handleDownloadModel = () => {
    const model = `nome;email;profile;publico\nusuario exemplo;usuario@teste.com;usuario;[]`

    downloadBlob(model, 'users-model.csv', 'data:text/csv;charset=utf-8')
  }

  const resetState = () => {
    setErrors([])
    setFile(undefined)
  }

  const handleUploadFile = (data: ChangeEvent<HTMLInputElement>) => {
    resetState()
    const file = data.target.files?.[0]

    if (file?.type !== 'text/csv') {
      const error: ErrorType = {
        content:
          'Formato de arquivo inválido! apenas arquivos csv são aceitos.',
        type: 'invalid-file-type'
      }
      setErrors([error])
      return
    }

    setFile(file)
  }

  const resetStatus = () => {
    setFile(undefined)
    store.dispatch(actions.user.resetStatus())
  }

  useEffect(() => {
    if (status.status === 'success') {
      modalControls.onClose()
    }
  }, [status])

  const handleSendFile = () => {
    if (!file) return

    store.dispatch(actions.user.createBulk({ file }))
  }

  const modal = (
    <Modal {...modalControls} isCentered onCloseComplete={resetStatus}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Text fontSize="20px">Atualizar Usuários</Text>
        </ModalHeader>
        <ModalBody py={0}>
          <Text fontSize="14px" fontWeight="normal">
            Adicione um csv com as informações para criação de um novo usuário
            ou edição de um existente caso ele já exista
          </Text>
          <Center my="32px">
            <Button
              bgColor="initial.white"
              color="primary.dark"
              borderWidth="2px"
              borderColor="primary.dark"
              size="sm"
              fontSize="14px"
              leftIcon={<Icon as={AiOutlineCloudDownload} />}
              _hover={{ bgColor: 'initial.white' }}
              onClick={handleDownloadModel}
            >
              Baixar Modelo
            </Button>
            <Button
              ml="8px"
              size="sm"
              fontSize="14px"
              leftIcon={<Icon as={AiOutlineCloudUpload} />}
              onClick={() => inputRef.current.click()}
            >
              Escolher Arquivo
            </Button>
            <Input
              ref={inputRef}
              display="none"
              type="file"
              accept="text/csv"
              onChange={handleUploadFile}
            />
          </Center>
          {file && (
            <Flex alignItems="center">
              <Icon as={AiOutlineFile} />
              <Text ml="6px" fontSize="12px">
                {file?.name}
              </Text>
            </Flex>
          )}
          <Stack spacing="16px" my="16px">
            {errors.map(error => (
              <Alert
                borderRadius="8px"
                fontSize="12px"
                status="error"
                key={error.type}
                p={2}
              >
                <AlertIcon />
                {error.content}
              </Alert>
            ))}
            {status.message && (
              <Alert
                borderRadius="8px"
                fontSize="12px"
                status="error"
                key={status.message}
                p={2}
              >
                <AlertIcon />
                {status.message}
              </Alert>
            )}
          </Stack>
        </ModalBody>
        <ModalFooter pt={0}>
          <Flex>
            <Button
              ml="8px"
              size="sm"
              fontSize="14px"
              onClick={handleSendFile}
              isLoading={status.status === 'loading'}
              disabled={!file}
            >
              Enviar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  return (
    <>
      <Button
        leftIcon={<Icon as={AiOutlineUpload} />}
        fontSize="14px"
        mb={0}
        px={6}
        onClick={modalControls.onOpen}
      >
        Importar Usuários
      </Button>
      {modal}
    </>
  )
}
