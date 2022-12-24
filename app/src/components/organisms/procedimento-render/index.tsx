import { Box, Divider, Flex, Stack, Text } from '@chakra-ui/react'
import { CustomCampoInvalido } from 'components/pages/coordenacao/analise-procedimento'
import { FormularioModel } from 'domain/models/formulario'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { useState } from 'react'
import { MultipleSelect } from 'components/atoms/multiple-select'
import Formulario from './formulario'

type Props = {
  procedimento: ProcedimentoModel
  formularios: FormularioModel[]
  onInvalidateField?: (campo: CustomCampoInvalido) => void
  camposInvalidos?: CustomCampoInvalido[]
  editable?: boolean
}

export default function Procedimento({
  formularios,
  procedimento,
  camposInvalidos = [],
  editable = false,
  onInvalidateField
}: Props) {
  const [formularioSelecionado, setFormularioSelecionado] = useState(
    formularios[0]
  )

  function handleSelectFormulario(formularioId: number) {
    const novoFormulario = formularios.find(
      formulario => formulario.id === formularioId
    )

    if (!novoFormulario || novoFormulario.id === formularioSelecionado.id) {
      return
    }

    setFormularioSelecionado(novoFormulario)
  }

  const formularioOptions = formularios.map(formulario => ({
    label: formulario.nome,
    value: formulario.id
  }))

  return (
    <>
      <Stack spacing="1rem" fontSize="sm">
        <Flex alignItems="center">
          <Text mr="0.5rem" fontWeight="bold">
            Nome:
          </Text>
          <Text>{procedimento.tipo_procedimento?.nome}</Text>
        </Flex>
        <Flex alignItems="center">
          <Text fontWeight="bold" mr="0.5rem">
            Formulário:
          </Text>
          <MultipleSelect
            defaultValue={formularioOptions[0]}
            onChange={e => handleSelectFormulario(Number(e?.value))}
            options={formularioOptions}
          />
        </Flex>
      </Stack>
      <Divider borderWidth="1px" borderColor="#EEE" my="1rem" />
      <Box height="100%" overflowY="auto">
        {formularioSelecionado && (
          <Formulario
            editable={editable}
            formulario={formularioSelecionado}
            procedimento={procedimento}
            handleInvalidate={onInvalidateField}
            camposInvalidos={camposInvalidos}
          />
        )}
      </Box>
    </>
  )
}
