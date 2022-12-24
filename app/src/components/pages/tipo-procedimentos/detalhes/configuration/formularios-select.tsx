import { Box, Text } from '@chakra-ui/react'
import { SelectOption, MultipleSelect } from 'components/atoms/multiple-select'
import { SimpleErrorMessage } from 'components/atoms/simple-error-message'
import { InfoIcon } from 'components/molecules/info'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'

export default function FormularioSelect() {
  const { setValue, watch } = useFormContext()

  const selecionados = (watch('formularios') || []) as number[]

  const formularios = useSelector(
    selectors.tipoProcedimentoDetalhes.getFormularios
  )

  const formOptions = formularios.map(formulario => ({
    value: formulario.id,
    label: `id: ${formulario.id} - ${formulario.nome}`
  }))

  const getSelectedOptions = () => {
    return formOptions.filter(option => selecionados.includes(option.value))
  }

  const handleOnChangeSelecionados = (value: any) => {
    const newValues = value as SelectOption[]
    const ids = newValues.map(value => value.value)

    setValue('formularios', ids)
  }

  return (
    <Box>
      <Text fontSize="sm" fontWeight="bold" mb="0.5rem">
        Formulários
        <InfoIcon label="Selecione um ou mais formulários que serão preenchidos pelo usuário" />
      </Text>
      <MultipleSelect
        isMulti
        options={formOptions}
        value={getSelectedOptions()}
        onChange={handleOnChangeSelecionados}
      />
      {getSelectedOptions().length === 0 && (
        <SimpleErrorMessage message="Selecione ao menos um formulário" />
      )}
    </Box>
  )
}
