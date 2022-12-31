import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import CustomMentionsInput from 'components/atoms/mention/custom-mentions'
import { SimpleErrorMessage } from 'components/atoms/simple-error-message'
import { CampoFormulario } from 'domain/models/formulario'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { SuggestionDataItem } from 'react-mentions'
import { extract } from 'utils/validation'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function TemplateModal({ isOpen, onClose }: Props) {
  const { watch, setValue, getValues } = useFormContext()
  const [content, setContent] = useState(getValues('template') || '')

  const [invalidTitles, setInvalidTitles] = useState<string[]>([])

  const campos: CampoFormulario[] = watch('campos') || []

  const suggestions: SuggestionDataItem[] = campos
    .filter(campo => campo.configuracao_campo.titulo)
    .map(campo => ({
      id: campo.ordem,
      display: campo.configuracao_campo.titulo
    }))

  const handleSave = () => {
    const extractor = extract('<<', '>>')
    const fieldTitles = extractor(content)
    let invalids: string[] = []

    fieldTitles.forEach(title => {
      const matched = campos.find(
        campo => campo.configuracao_campo.titulo === title
      )

      if (!matched) {
        invalids.push(title)
      }
    })

    invalids = [...new Set(invalids)]

    if (invalids.length > 0) {
      setInvalidTitles(invalids)
      return
    }

    setValue('template', content)
    onClose()
  }

  return (
    <Modal
      size="xl"
      closeOnEsc={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Template PDF</ModalHeader>
          <ModalBody w="100%" fontSize="sm">
            <Text size="sm" mb="0.5rem">
              Os dados preenchidos pelo usuário no formulário podem ser
              inseridos no PDF gerado a partir desse template. Utilize @ para
              inserir quais campos devem ser inseridos ao exportar o formulário.
            </Text>
            <CustomMentionsInput
              onChange={e => setContent(e.target.value)}
              value={content}
              height={400}
              mentions={[
                { data: suggestions, trigger: '@', markup: '<<__display__>>' }
              ]}
            />
            {invalidTitles.length > 0 && (
              <SimpleErrorMessage
                message={`Os campos ${invalidTitles} não existem no estado atual do formulário`}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              customVariant="ghost"
              size="sm"
              mr="0.5rem"
            >
              Cancelar
            </Button>
            <Button size="sm" onClick={handleSave}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
