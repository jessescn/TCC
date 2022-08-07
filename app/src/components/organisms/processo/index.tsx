import { Box, Divider, Flex, Select, Stack, Text } from '@chakra-ui/react'
import { CustomCampoInvalido } from 'components/pages/analisar-processo/content'
import { FormularioModel } from 'domain/models/formulario'
import { CampoInvalido, ProcessoModel } from 'domain/models/processo'
import { useState } from 'react'
import Formulario from './formulario'

type Props = {
  processo: ProcessoModel
  formularios: FormularioModel[]
  handleInvalidateField?: (campo: CustomCampoInvalido) => void
  camposInvalidos?: CustomCampoInvalido[]
  editable?: boolean
}

export default function Processo({
  formularios,
  processo,
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
          <Text fontSize="12px">{processo.tipo_processo?.nome}</Text>
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
            processo={processo}
            handleInvalidate={handleInvalidateField}
            camposInvalidos={camposInvalidos}
          />
        )}
      </Box>
    </>
  )
}
