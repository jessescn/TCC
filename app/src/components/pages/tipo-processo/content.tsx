import {
  Box,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'
import MultipleSelect from 'components/atoms/multiple-select'
import { FormularioModel } from 'domain/models/formulario'
import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'

type Props = {
  tipoProcesso?: TipoProcessoModel
}

const Content = ({ tipoProcesso }: Props) => {
  const {
    register,
    formState: { isDirty }
  } = useFormContext()

  const formularios = useSelector(selectors.form.getFormularios)

  const formOptions = formularios.map(formulario => ({
    value: formulario.id,
    label: formulario.nome
  }))

  const populated = useRef(false)
  const [selectedFormOptions, setSelectedFormOptions] = useState<any[]>([])

  useEffect(() => {
    if (populated.current || formOptions.length === 0) {
      return
    }

    const options = formOptions.filter(option =>
      tipoProcesso?.formularios.includes(Number(option.value))
    )

    setSelectedFormOptions(options)
    populated.current = true
  }, [formOptions])

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      width: '100%',
      fontSize: '14px',
      backgroundColor: 'white'
    }),
    option: (styles: any) => {
      return {
        ...styles,
        width: '100%',
        fontSize: '12px'
      }
    }
  }

  return (
    <Stack spacing="24px">
      <Flex alignItems="center">
        <Text fontSize="14px" fontWeight="bold">
          Nome:
        </Text>
        <Input
          defaultValue={tipoProcesso?.nome}
          size="sm"
          ml="8px"
          {...register('nome')}
        />
      </Flex>
      <Box>
        <Text fontSize="14px" mb="8px" fontWeight="bold">
          Descricão:
        </Text>
        <Textarea
          defaultValue={tipoProcesso?.descricao}
          size="sm"
          {...register('descricao')}
        />
      </Box>
      <Flex>
        <Flex alignItems="center" w="50%">
          <Text fontSize="14px" fontWeight="bold">
            Escopo:
          </Text>
          <Select ml="8px" w="fit-content" size="sm">
            <option value="publico">Público</option>
            <option value="privado">Privado</option>
          </Select>
        </Flex>
        <Flex alignItems="center">
          <Text fontSize="14px" fontWeight="bold">
            Colegiado:
          </Text>
          <Select ml="8px" w="fit-content" size="sm">
            <option value="publico">Sim</option>
            <option value="privado">Não</option>
          </Select>
        </Flex>
      </Flex>
      <Flex>
        <Flex alignItems="center" w="50%">
          <Text fontSize="14px" fontWeight="bold">
            Data início:
          </Text>
          <Input size="sm" ml="8px" w="fit-content" type="date" />
        </Flex>
        <Flex alignItems="center">
          <Text fontSize="14px" fontWeight="bold">
            Data Fim:
          </Text>
          <Input size="sm" ml="8px" w="fit-content" type="date" />
        </Flex>
      </Flex>
      <Box>
        <Text fontSize="14px" fontWeight="bold" mb="8px">
          Formulários
        </Text>
        <MultipleSelect
          isMulti
          styles={customStyles}
          options={formOptions}
          value={selectedFormOptions}
          onChange={value => setSelectedFormOptions(value as any)}
        />
      </Box>
    </Stack>
  )
}

export default Content
