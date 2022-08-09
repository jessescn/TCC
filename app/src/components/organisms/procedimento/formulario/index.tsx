import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import { CustomCampoInvalido } from 'components/pages/analisar-procedimento/content'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import {
  CampoInvalido,
  ProcedimentoModel,
  Resposta
} from 'domain/models/procedimento'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { actions, store, useSelector } from 'store'
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
  const navigate = useNavigate()
  const statusUpdate = useSelector(state => state.procedimento.status)
  const saveChangesModalControls = useDisclosure()

  const methods = useForm<CustomFormModel>({
    defaultValues: { respostas: procedimento.respostas }
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
      navigate(-1)
    }
  }, [statusUpdate])

  return (
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
        {editable && !handleInvalidate && (
          <Flex justifyContent="flex-end" mt="16px">
            <Button
              bgColor="primary.dark"
              color="initial.white"
              display="block"
              size="sm"
              onClick={saveChangesModalControls.onOpen}
            >
              Salvar alterações
            </Button>
          </Flex>
        )}
        <SaveChangesModal {...saveChangesModalControls} />
      </form>
    </FormProvider>
  )
}
