import { Box, Divider, Flex, Select, Stack, Text } from '@chakra-ui/react'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { ProcessoModel } from 'domain/models/processo'
import { useState } from 'react'
import Formulario from 'components/organisms/processo/formulario'
import Votes from './vote'

type Props = {
  processo: ProcessoModel
  invalidos: CampoFormulario[]
  setInvalidos: React.Dispatch<React.SetStateAction<CampoFormulario[]>>
  formularios: FormularioModel[]
}

const Content = ({ processo, invalidos, setInvalidos, formularios }: Props) => {
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

  function handleInvalidate(question: CampoFormulario) {
    const alreadyInvalid = invalidos.find(
      campo => campo.ordem === question.ordem
    )

    if (!alreadyInvalid) {
      setInvalidos([...invalidos, question])
      return
    }

    setInvalidos(prev => prev.filter(valor => valor.ordem !== question.ordem))
  }

  return (
    <Box h="100%">
      <Flex justifyContent="space-between">
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
        <Votes processo={processo} />
      </Flex>
      <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
      <Box overflowY="auto" height="80%">
        {formularioSelecionado && (
          <Formulario
            formulario={formularioSelecionado}
            processo={processo}
            invalidos={invalidos}
            handleInvalidate={handleInvalidate}
          />
        )}
      </Box>
    </Box>
  )
}

export default Content
