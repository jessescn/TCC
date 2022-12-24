import { Box, Stack, Text } from '@chakra-ui/react'
import { camposComponente } from 'components/molecules/forms/fields'
import { Procedimento } from 'domain/entity/procedimento'
import { FormularioModel } from 'domain/models/formulario'
import { Resposta, RespostaCampo } from 'domain/models/procedimento'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  formulario: FormularioModel
}

export const FormularioRender = ({ formulario }: Props) => {
  const { getValues, setValue } = useFormContext()

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
    <>
      <Stack spacing="1rem">
        <>
          <Box bgColor="initial.white" p="1.5rem" borderRadius="lg">
            <Text as="h1" fontSize="2xl" fontWeight="bold" mb="0.5rem">
              {formulario.nome}
            </Text>
            {formulario.descricao && (
              <Text as="h2">{formulario.descricao}</Text>
            )}
          </Box>
          {formulario.campos.map(campo => {
            const CampoComponente = camposComponente[campo.tipo]

            return (
              <Box
                key={campo.ordem}
                p="1.5rem"
                bgColor="initial.white"
                borderRadius="lg"
              >
                <CampoComponente
                  {...campo}
                  onUpdateResposta={handleUpdateResposta}
                  formulario={formulario}
                  editable
                />
              </Box>
            )
          })}
        </>
      </Stack>
    </>
  )
}
