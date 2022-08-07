import { Button, Flex } from '@chakra-ui/react'
import { CustomCampoInvalido } from 'components/pages/analisar-processo/content'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { CampoInvalido, ProcessoModel } from 'domain/models/processo'
import { FormProvider, useForm } from 'react-hook-form'
import RenderContent from './render-campos'

type Props = {
  formulario: FormularioModel
  processo: ProcessoModel
  camposInvalidos?: CustomCampoInvalido[]
  editable?: boolean
  handleInvalidate?: (question: CustomCampoInvalido) => void
}

export default function Formulario({
  formulario,
  processo,
  editable = false,
  camposInvalidos = [],
  handleInvalidate
}: Props) {
  const methods = useForm({ defaultValues: { respostas: processo.respostas } })

  const updateResposta = (exemplo: any) => {
    console.log(exemplo)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(updateResposta)}>
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
              type="submit"
            >
              Salvar alterações
            </Button>
          </Flex>
        )}
      </form>
    </FormProvider>
  )
}
