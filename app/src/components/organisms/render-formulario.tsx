import { Box, Stack, Text } from '@chakra-ui/react'
import { campoComponente } from 'components/molecules/forms/fields'
import { Procedimento } from 'domain/entity/procedimento'
import { FormularioModel } from 'domain/models/formulario'
import { Resposta, RespostaCampo } from 'domain/models/procedimento'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  formulario: FormularioModel
}

export default function RenderFormulario({ formulario }: Props) {
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
      <Box
        bgColor="initial.white"
        px="24px"
        py="32px"
        borderRadius="8px"
        mb="16px"
      >
        <Text as="h1" fontSize="24px" fontWeight="bold" mb="16px">
          {formulario.nome}
        </Text>
        {formulario.descricao && <Text as="h2">{formulario.descricao}</Text>}
      </Box>
      <Stack spacing="16px">
        {formulario.campos.map(campo => {
          const Componente = campoComponente[campo.tipo]

          return (
            <Box
              key={campo.ordem}
              bgColor="initial.white"
              px="24px"
              py="32px"
              borderRadius="8px"
            >
              <Componente
                {...campo}
                onUpdateResposta={handleUpdateResposta}
                formulario={formulario}
                editable
              />
            </Box>
          )
        })}
      </Stack>
    </>
  )
}
