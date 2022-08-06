import { Box, Text } from '@chakra-ui/react'
import { AxiosResponse } from 'axios'
import MultipleSelect from 'components/atoms/multiple-select'
import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { UserService } from 'services/user'

type Option = {
  value: any
  label: string
}

type Props = {
  tipoProcesso?: TipoProcessoModel
}

export default function PublicosSelect({ tipoProcesso }: Props) {
  const { setValue } = useFormContext()

  const initialPopulated = useRef(false)
  const [selectedPublicos, setSelectedPublicos] = useState<Option[]>([])
  const [publicosOptions, setPublicoOptions] = useState<Option[]>([])

  useEffect(() => {
    const fetchPublicos = async () => {
      const response: AxiosResponse<string[]> = await UserService.publicos()

      return response.data
    }

    fetchPublicos().then(data => {
      const options = data.map(publico => ({ value: publico, label: publico }))

      setPublicoOptions(options)
    })
  }, [])

  useEffect(() => {
    if (
      initialPopulated.current ||
      !tipoProcesso ||
      publicosOptions.length === 0
    ) {
      return
    }

    const options = publicosOptions.filter(option =>
      tipoProcesso?.publicos.includes(option.value)
    )

    setSelectedPublicos(options)
    initialPopulated.current = true
  }, [publicosOptions, tipoProcesso])

  useEffect(() => {
    const values = selectedPublicos.map(formOption => formOption.value)
    setValue('publicos', values)
  }, [selectedPublicos])

  return (
    <Box>
      <Text fontSize="14px" fontWeight="bold" mb="8px">
        Públicos
        <Text as="span" fontWeight="normal" fontSize="10px" ml="8px">
          selecione os públicos que vão poder visualizar e preencher esse
          procedimento
        </Text>
      </Text>
      <MultipleSelect
        isMulti
        value={selectedPublicos}
        options={publicosOptions}
        onChange={value => setSelectedPublicos(value as any)}
      />
    </Box>
  )
}
