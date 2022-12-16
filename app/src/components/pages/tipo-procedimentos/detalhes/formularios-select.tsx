import { Box, Text } from '@chakra-ui/react'
import MultipleSelect from 'components/atoms/multiple-select'
import { InfoIcon } from 'components/molecules/info'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'

type Option = {
  value: any
  label: string
}

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
    const newValues = value as Option[]
    const ids = newValues.map(value => value.value)

    setValue('formularios', ids)
  }

  return (
    <Box>
      <Text fontSize="14px" fontWeight="bold" mb="8px">
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
        <Text mt="6px" fontSize="10px" color="#E53E3E">
          Selecione ao menos um formulário
        </Text>
      )}
    </Box>
  )
}
