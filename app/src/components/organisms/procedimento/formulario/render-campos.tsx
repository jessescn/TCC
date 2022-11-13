import { Box, Stack } from '@chakra-ui/react'
import { campoComponente } from 'components/molecules/forms/fields'
import { CustomCampoInvalido } from 'components/pages/coordenacao/analise-procedimento/content'
import { Procedimento } from 'domain/entity/procedimento'
import { FormularioModel } from 'domain/models/formulario'
import { Resposta, RespostaCampo } from 'domain/models/procedimento'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  formulario: FormularioModel
  editable?: boolean
  camposInvalidos: CustomCampoInvalido[]
  handleInvalidate?: (question: CustomCampoInvalido) => void
}

export default function RenderContent({
  formulario,
  camposInvalidos,
  editable = false,
  handleInvalidate
}: Props) {
  const { getValues, setValue } = useFormContext()
  const camposInvalidosMap = new Map(
    camposInvalidos.map(campo => [campo.ordem, campo])
  )

  const handleUpdateResposta = useCallback(
    (novoCampo: RespostaCampo) => {
      const respostas: Resposta[] = getValues('respostas') || []
      const respostasAtualizadas = Procedimento.updateRespostaCampoByFormulario(
        respostas,
        novoCampo,
        formulario.id
      )

      setValue('respostas', respostasAtualizadas)
    },
    [getValues, formulario, setValue]
  )

  return (
    <Stack
      height="100%"
      spacing="8px"
      bgColor="secondary.default"
      p="8px"
      opacity={editable ? 1 : 0.5}
    >
      {formulario.campos.map(campo => {
        const Componente = campoComponente[campo.tipo]
        const isInvalido = !!camposInvalidosMap.get(campo.ordem)

        const isParagrafo = campo.tipo === 'paragrafo'

        const handleInvalideField = () => {
          if (!handleInvalidate) return

          handleInvalidate({
            ordem: campo.ordem,
            formulario: formulario.id,
            campo
          })
        }

        return (
          <Box
            key={campo.ordem}
            borderColor={
              editable && isInvalido && !isParagrafo
                ? 'info.error'
                : 'initial.white'
            }
            bgColor="initial.white"
            borderWidth="1px"
            borderRadius="4px"
            p="16px"
          >
            {isParagrafo ? (
              <Componente {...campo} formulario={formulario} />
            ) : (
              <Componente
                {...campo}
                editable={editable}
                onUpdateResposta={handleUpdateResposta}
                formulario={formulario}
                onInvalide={handleInvalidate ? handleInvalideField : undefined}
                isInvalido={(editable || handleInvalidate) && isInvalido}
              />
            )}
          </Box>
        )
      })}
    </Stack>
  )
}
