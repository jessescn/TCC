import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { Button as CustomButton } from 'components/atoms/button'
import { ErrorMessage } from 'components/molecules/forms/error-message'
import { FormularioModel } from 'domain/models/formulario'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { DuplicateFormModal } from './duplicate-modal'
import EditForm from './edit-form'
import { Footer } from './footer'

type Props = {
  formulario?: FormularioModel
}

export default function Content({ formulario }: Props) {
  const {
    register,
    reset,
    formState: { errors }
  } = useFormContext()

  const [showGeneral, setShowGeneral] = useState(true)
  const [showForm, setShowForm] = useState(true)
  const cancelRef = useRef<HTMLButtonElement | FocusableElement>(null)

  const duplicateModalControls = useDisclosure()

  const handleToggleGeneral = () => setShowGeneral(!showGeneral)
  const handleToggleForm = () => setShowForm(!showForm)

  const handleDuplicateModal = (formulario: FormularioModel) => {
    reset({
      campos: formulario.campos,
      nome: formulario.nome,
      descricao: formulario.descricao
    })
    duplicateModalControls.onClose()
  }

  return (
    <>
      <Box>
        <Flex justifyContent="space-between">
          <Button
            display="block"
            variant="unstyled"
            px={0}
            mb="8px"
            onClick={handleToggleGeneral}
            _focus={{ boxShadow: 'none' }}
            leftIcon={
              <Icon
                as={showGeneral ? MdOutlineExpandLess : MdOutlineExpandMore}
              />
            }
          >
            Configurações Gerais
          </Button>
          <CustomButton
            size="sm"
            fontSize="14px"
            onClick={duplicateModalControls.onOpen}
          >
            Duplicar formulário
          </CustomButton>
        </Flex>
        <Collapse in={showGeneral} animateOpacity>
          <Stack spacing="16px">
            <Box alignItems="center">
              <Text fontSize="14px" mb="8px" fontWeight="bold">
                Nome:
              </Text>
              <Input
                size="sm"
                isInvalid={errors['nome']}
                defaultValue={formulario?.nome}
                {...register('nome', {
                  required: { value: true, message: 'Nome obrigatório' }
                })}
              />
              <ErrorMessage errors={errors} fieldName="nome" />
            </Box>
            <Box>
              <Text fontSize="14px" mb="8px" fontWeight="bold">
                Descrição:
              </Text>
              <Textarea
                size="sm"
                defaultValue={formulario?.descricao}
                {...register('descricao')}
              />
            </Box>
          </Stack>
        </Collapse>
        <Button
          variant="unstyled"
          px={0}
          mb="8px"
          mt="24px"
          onClick={handleToggleForm}
          _focus={{ boxShadow: 'none' }}
          leftIcon={
            <Icon as={showForm ? MdOutlineExpandLess : MdOutlineExpandMore} />
          }
        >
          Configuração dos Campos
          <Text fontSize="12px" fontWeight="normal">
            (Ao menos um campo é obrigatório)
          </Text>
        </Button>
        <Collapse in={showForm} animateOpacity>
          <EditForm />
        </Collapse>
        <Footer />
      </Box>
      {duplicateModalControls.isOpen && (
        <DuplicateFormModal
          onConfirm={handleDuplicateModal}
          cancelRef={cancelRef}
          {...duplicateModalControls}
        />
      )}
    </>
  )
}
