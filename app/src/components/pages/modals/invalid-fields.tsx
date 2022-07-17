import {
  Box,
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  UnorderedList
} from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  invalidFields: CampoFormulario[]
  onSendFeedback: (feedback: string) => void
}

export default function InvalidFieldsModal({
  isOpen,
  onClose,
  invalidFields,
  onSendFeedback
}: Props) {
  const [feedback, setFeedback] = useState('')

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="24px">Campos Inválidos</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody height="fit-content">
          <Text fontSize="14px">
            Os seguintes campos estão com dados inválidos e precisam sem
            revisados
          </Text>
          <UnorderedList p="16px">
            {invalidFields.map(field => (
              <ListItem key={field.ordem} fontSize="14px">
                {''}
              </ListItem>
            ))}
          </UnorderedList>

          <Box mt="36px">
            <Text mb="8px" fontWeight="bold" fontSize="14px">
              Comentário
            </Text>
            <Textarea
              _placeholder={{ fontSize: '12px' }}
              fontSize="12px"
              onChange={e => setFeedback(e.target.value)}
              placeholder="Adicione um comentário detalhando o que deve ser corrigido"
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => onSendFeedback(feedback)}
            bgColor="transparent"
            color="info.error"
            borderWidth="2px"
            fontSize="12px"
            borderColor="info.error"
            _hover={{
              color: 'initial.white',
              bgColor: 'info.error'
            }}
            px="20px"
            py="6px"
          >
            Enviar feedback
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
