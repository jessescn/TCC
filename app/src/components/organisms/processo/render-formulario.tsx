import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import { campoComponente } from 'components/molecules/forms/fields'
import { Processo } from 'domain/entity/processo'
import { FormularioModel } from 'domain/models/formulario'
import { Resposta, RespostaCampo } from 'domain/models/processo'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  formulario: FormularioModel
  editable?: boolean
}

export default function RenderFormulario({
  formulario,
  editable = false
}: Props) {
  const { getValues, setValue } = useFormContext()

  const handleUpdateResposta = useCallback(
    (novoCampo: RespostaCampo) => {
      const respostas: Resposta[] = getValues('respostas') || []
      const respostasAtualizadas = Processo.updateRespostaCampoByFormulario(
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

        return (
          <Box key={campo.ordem} bgColor="initial.white" p="16px">
            <Componente
              {...campo}
              editable={editable}
              onUpdateResposta={handleUpdateResposta}
              formulario={formulario}
            />
          </Box>
        )
      })}
      {editable && (
        <Flex justifyContent="flex-end">
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
    </Stack>
  )
}
