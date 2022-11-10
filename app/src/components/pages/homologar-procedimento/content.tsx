import { Box, Divider, Flex, Select, Stack, Text } from '@chakra-ui/react'
import { FormularioModel } from 'domain/models/formulario'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { useState } from 'react'
import Formulario from 'components/organisms/procedimento/formulario'
import Votes from './vote'

type Props = {
  procedimento: ProcedimentoModel
  formularios: FormularioModel[]
}

const Content = ({ procedimento, formularios }: Props) => {
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
    <Box>
      <Flex justifyContent="space-between">
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
        <Votes procedimento={procedimento} />
      </Flex>
      <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
      <Box>
        {formularioSelecionado && (
          <Formulario
            formulario={formularioSelecionado}
            procedimento={procedimento}
          />
        )}
      </Box>
    </Box>
  )
}

export default Content
