import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
import { selectors, useSelector } from 'store'
import DuplicateFormularioModal from './duplicate-modal'
import RenderFormBuilder from './form-builder'
import Preview from './preview'

export default function Configuration() {
  const {
    register,
    reset,
    formState: { errors }
  } = useFormContext()

  const [showGeneral, setShowGeneral] = useState(true)
  const [showForm, setShowForm] = useState(true)
  const cancelRef = useRef<HTMLButtonElement | FocusableElement>(null)

  const formulario = useSelector(selectors.formularioDetalhes.getFormulario)

  const duplicateModalControls = useDisclosure()

  const handleToggleGeneral = () => setShowGeneral(prev => !prev)
  const handleToggleForm = () => setShowForm(prev => !prev)

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
            px={0}
            mb="0.5rem"
            display="block"
            variant="unstyled"
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
            fontSize="sm"
            onClick={duplicateModalControls.onOpen}
          >
            Duplicar formulário
          </CustomButton>
        </Flex>
        <Collapse in={showGeneral} animateOpacity>
          <Stack spacing="1rem">
            <Box alignItems="center">
              <Text fontSize="sm" mb="0.5rem" fontWeight="bold">
                Nome
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
              <Text fontSize="sm" mb="0.5rem" fontWeight="bold">
                Descrição
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
          mb="0.5rem"
          mt="1.5rem"
          onClick={handleToggleForm}
          _focus={{ boxShadow: 'none' }}
          leftIcon={
            <Icon as={showForm ? MdOutlineExpandLess : MdOutlineExpandMore} />
          }
        >
          Configuração dos Campos
          <Text fontSize="xs" fontWeight="normal">
            (Ao menos um campo é obrigatório)
          </Text>
        </Button>
        <Collapse in={showForm} animateOpacity>
          <Tabs isLazy>
            <TabList>
              <Tab>Campos</Tab>
              <Tab>Preview</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <RenderFormBuilder
                  onDuplicate={duplicateModalControls.onOpen}
                />
              </TabPanel>
              <TabPanel>
                <Preview />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Collapse>
      </Box>
      {duplicateModalControls.isOpen && (
        <DuplicateFormularioModal
          onConfirm={handleDuplicateModal}
          cancelRef={cancelRef}
          {...duplicateModalControls}
        />
      )}
    </>
  )
}
