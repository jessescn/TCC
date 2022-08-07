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
          <Text fontSize="20px">Campos Inválidos</Text>
        </ModalHeader>
        <ModalBody height="fit-content">
          <Text fontSize="14px">
            Os seguintes campos estão com dados inválidos e precisarão ser
            revisados pelo autor:
          </Text>
          <UnorderedList p="16px" maxH="300px" overflowY="auto">
            {invalidFields.map(field => (
              <ListItem key={field.ordem} fontSize="12px">
                {field.configuracao_campo?.titulo}
              </ListItem>
            ))}
          </UnorderedList>

          <Box mt="36px">
            <Text mb="8px" fontWeight="bold" fontSize="14px">
              Feedback
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
          <Button onClick={onClose} size="sm" variant="ghost" mr="8px">
            Cancelar
          </Button>
          <Button
            onClick={() => onSendFeedback()}
            bgColor="transparent"
            color="primary.dark"
            borderWidth="1px"
            size="sm"
            borderColor="primary.dark"
            _hover={{
              color: 'initial.white',
              bgColor: 'primary.dark'
            }}
          >
            Enviar análise
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
