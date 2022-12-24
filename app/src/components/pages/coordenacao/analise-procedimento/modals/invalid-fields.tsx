import {
  Box,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  UnorderedList
} from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { CampoFormulario } from 'domain/models/formulario'

type Props = {
  isOpen: boolean
  onClose: () => void
  invalidFields: CampoFormulario[]
  setFeedback: (feedback: string) => void
  onSendFeedback: () => void
}

export default function InvalidFieldsModal({
  isOpen,
  onClose,
  invalidFields,
  onSendFeedback,
  setFeedback
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="xl">Campos Inválidos</Text>
        </ModalHeader>
        <ModalBody height="fit-content">
          <Text fontSize="sm">
            Os seguintes campos estão com dados inválidos e precisarão ser
            revisados pelo autor:
          </Text>
          <UnorderedList p="1rem" maxH="300px" overflowY="auto">
            {invalidFields.map(field => (
              <ListItem key={field.ordem} fontSize="xs">
                {field.configuracao_campo?.titulo}
              </ListItem>
            ))}
          </UnorderedList>

          <Box mt="1.5rem">
            <Text mb="0.5rem" fontWeight="bold" fontSize="sm">
              Feedback
            </Text>
            <Textarea
              _placeholder={{ fontSize: 'sm' }}
              fontSize="sm"
              onChange={e => setFeedback(e.target.value)}
              placeholder="Adicione um comentário detalhando o que deve ser corrigido"
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} size="sm" customVariant="ghost" mr="0.5rem">
            Cancelar
          </Button>
          <Button customVariant="default" size="sm" onClick={onSendFeedback}>
            Enviar análise
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
