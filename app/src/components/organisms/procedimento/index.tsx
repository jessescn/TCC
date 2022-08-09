import { Box, Divider, Flex, Select, Stack, Text } from '@chakra-ui/react'
import { CustomCampoInvalido } from 'components/pages/analisar-procedimento/content'
import { FormularioModel } from 'domain/models/formulario'
import { CampoInvalido, ProcedimentoModel } from 'domain/models/procedimento'
import { useState } from 'react'
import Formulario from './formulario'

type Props = {
  procedimento: ProcedimentoModel
  formularios: FormularioModel[]
  handleInvalidateField?: (campo: CustomCampoInvalido) => void
  camposInvalidos?: CustomCampoInvalido[]
  editable?: boolean
}

export default function Procedimento({
  formularios,
  procedimento,
  camposInvalidos = [],
  editable = false,
  handleInvalidateField
}: Props) {
  const [formularioSelecionado, setFormularioSelecionado] = useState(
    formularios[0]
  )

  function handleSelectFormulario(option: string) {
    const novoFormularioSelecionado = formularios.find(
      formulario => formulario.id === Number(option)
    )

    if (!novoFormularioSelecionado) {
      return
    }

    setFormularioSelecionado(novoFormularioSelecionado)
  }

  return (
    <>
      <Stack spacing="16px">
        <Flex alignItems="center">
          <Text fontSize="14px" mr="8px" fontWeight="bold">
            Nome:
          </Text>
          <Text fontSize="12px">{procedimento.tipo_procedimento?.nome}</Text>
        </Flex>
        <Flex alignItems="center">
          <Text fontSize="14px" fontWeight="bold" mr="8px">
            Formulário:
          </Text>
          <Select
            size="xs"
            maxW="600px"
            onChange={e => handleSelectFormulario(e.target.value)}
          >
            {formularios.map(formulario => (
              <option value={`${formulario.id}`} key={formulario.id}>
                {formulario.nome}
              </option>
            ))}
          </Select>
        </Flex>
      </Stack>
      <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
      <Box height="100%" overflowY="auto">
        {formularioSelecionado && (
          <Formulario
            editable={editable}
            formulario={formularioSelecionado}
            procedimento={procedimento}
            handleInvalidate={handleInvalidateField}
            camposInvalidos={camposInvalidos}
          />
        )}
      </Box>
    </>
  )
}
