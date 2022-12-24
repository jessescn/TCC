import { Box, Text } from '@chakra-ui/react'
import CreatableSelect from 'components/atoms/creatable-select'
import { SelectOption } from 'components/atoms/multiple-select'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'

export default function PublicosSelect() {
  const { setValue, watch } = useFormContext()

  const publicos: string[] = watch('publico') || []

  const existentPublicos = useSelector(selectors.userDetalhes.getPublicos)

  const publicoOptions = useMemo(() => {
    return existentPublicos.map(publico => ({
      value: publico,
      label: publico
    }))
  }, [publicos])

  const getSelectedOptions = () => {
    return publicos.map(publico => ({ value: publico, label: publico }))
  }

  const handleOnChangeSelecionados = (value: any) => {
    const newValues = value as SelectOption[]
    const values = newValues.map(value => value.value)

    setValue('publico', values)
  }

  return (
    <Box>
      <Text fontSize="sm" fontWeight="bold">
        Públicos
      </Text>
      <Text fontSize="xs" my="0.5rem">
        Selecione um público existente ou crie um novo público. Alterar os
        públicos pode afetar o acesso do usuário a procedimentos.
      </Text>
      <CreatableSelect
        isMulti
        value={getSelectedOptions()}
        options={publicoOptions}
        onChange={handleOnChangeSelecionados}
      />
    </Box>
  )
}
