import { Divider, Flex, Select, Stack, Text } from '@chakra-ui/react'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { ProcessoModel } from 'domain/models/processo'
import { useState } from 'react'
import RenderFormulario from './render-formulario'

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

  function handleSelectFormulario(option: any) {
    console.log(option)
    return null
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
          <Select size="xs" maxW="600px" onChange={handleSelectFormulario}>
            {formularios.map(formulario => (
              <option value={formulario.id} key={formulario.id}>
                {formulario.nome}
              </option>
            ))}
          </Select>
        </Flex>
      </Stack>
      <Divider borderWidth="2px" borderColor="#EEE" my="16px" />
      {formularioSelecionado && (
        <RenderFormulario
          formulario={formularioSelecionado}
          processo={processo}
          handleInvalidate={handleInvalidate}
        />
      )}
    </>
  )
}

export default Content
