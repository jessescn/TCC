import {
  Button,
  Center,
  Collapse,
  Flex,
  Icon,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { CustomCampoInvalido } from 'components/pages/coordenacao/analise-procedimento/content'
import { FormularioModel } from 'domain/models/formulario'
import { ProcedimentoModel, Resposta } from 'domain/models/procedimento'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BsChevronBarExpand, BsChevronExpand } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { actions, store, useSelector } from 'store'
import { loadFields } from 'utils/procedimento'
import SaveChangesModal from './modals/save-changes'
import RenderContent from './render-campos'

type Props = {
  formulario: FormularioModel
  procedimento: ProcedimentoModel
  camposInvalidos?: CustomCampoInvalido[]
  editable?: boolean
  handleInvalidate?: (question: CustomCampoInvalido) => void
}

type CustomFormModel = {
  respostas: Resposta[]
}

export default function Formulario({
  formulario,
  procedimento,
  editable = false,
  camposInvalidos = [],
  handleInvalidate
}: Props) {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  const navigate = useNavigate()
  const statusUpdate = useSelector(
    state => state.procedimento.statusUpdateStatus
  )

  const isLoading = statusUpdate === 'loading'
  const saveChangesModalControls = useDisclosure()

  const defaultFields = loadFields(procedimento)

  const methods = useForm<CustomFormModel>({
    defaultValues: { respostas: procedimento.respostas, ...defaultFields }
  })

  const updateResposta = (data: CustomFormModel) => {
    saveChangesModalControls.onClose()
    store.dispatch(
      actions.procedimento.update({
        id: procedimento.id,
        data: { respostas: data.respostas }
      })
    )
  }

  useEffect(() => {
    if (statusUpdate === 'success') {
      store.dispatch(actions.procedimento.resetStatus())
      navigate('/meus-procedimentos')
    }
  }, [statusUpdate])

  return (
    <>
      <Flex justifyContent="flex-end" mb="8px">
        <Button
          size="xs"
          onClick={onToggle}
          _focus={{ boxShadow: 'none' }}
          rightIcon={
            <Icon as={isOpen ? BsChevronBarExpand : BsChevronExpand} />
          }
        >
          {isOpen ? 'Ocultar formulário' : 'Expandir formulário'}
        </Button>
      </Flex>
      {!isOpen && (
        <Center h="100%">
          <Text fontSize="14px">
            Formulário(s) ocultado(s). Para visualizar, clique em 'Expandir
            formulário'
          </Text>
        </Center>
      )}
      <Collapse in={isOpen} animateOpacity>
        <FormProvider {...methods}>
          <form
            id="procedimento-form"
            onSubmit={methods.handleSubmit(updateResposta)}
          >
            <RenderContent
              formulario={formulario}
              editable={editable}
              camposInvalidos={camposInvalidos}
              handleInvalidate={handleInvalidate}
            />
          </form>
        </FormProvider>
      </Collapse>
      {editable && !handleInvalidate && (
        <Flex justifyContent="flex-end" mt="16px">
          <Button
            bgColor="primary.dark"
            color="initial.white"
            size="sm"
            onClick={saveChangesModalControls.onOpen}
            isLoading={isLoading}
            loadingText="Salvando"
          >
            Salvar alterações
          </Button>
        </Flex>
      )}
      <SaveChangesModal {...saveChangesModalControls} />
    </>
  )
}
