import {
  Box,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { useFormContext } from 'react-hook-form'
import { formatISODate } from 'utils/format'
import FormularioSelect from './formularios-select'
import PublicosSelect from './publicos-select'

type Props = {
  tipoProcedimento?: TipoProcedimentoModel
}

const Content = ({ tipoProcedimento }: Props) => {
  const { register } = useFormContext()

  return (
    <Stack spacing="24px">
      <Box alignItems="center">
        <Text fontSize="14px" mb="8px" fontWeight="bold">
          Nome:
        </Text>
        <Input
          defaultValue={tipoProcedimento?.nome}
          size="sm"
          {...register('nome')}
        />
      </Box>
      <Box>
        <Text fontSize="14px" mb="8px" fontWeight="bold">
          Descricão:
        </Text>
        <Textarea
          defaultValue={tipoProcedimento?.descricao}
          size="sm"
          {...register('descricao')}
        />
      </Box>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Text fontSize="14px" fontWeight="bold">
            Escopo:
          </Text>
          <Select ml="8px" w="fit-content" size="sm" {...register('escopo')}>
            <option value="publico">Público</option>
            <option value="privado">Privado</option>
          </Select>
        </Flex>
        <Flex alignItems="center">
          <Text fontSize="14px" fontWeight="bold">
            Colegiado:
          </Text>
          <Select ml="8px" w="fit-content" size="sm" {...register('colegiado')}>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </Select>
        </Flex>
        <Flex alignItems="center">
          <Text fontSize="14px" fontWeight="bold">
            Status:
          </Text>
          <Select ml="8px" w="fit-content" size="sm" {...register('status')}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </Select>
        </Flex>
      </Flex>
      <Flex>
        <Flex alignItems="center" w="50%">
          <Text fontSize="14px" fontWeight="bold">
            Data início:
          </Text>
          <Input
            size="sm"
            ml="8px"
            w="fit-content"
            type="date"
            defaultValue={formatISODate(tipoProcedimento?.dataInicio)}
            {...register('dataInicio')}
          />
        </Flex>
        <Flex alignItems="center">
          <Text fontSize="14px" fontWeight="bold">
            Data Fim:
          </Text>
          <Input
            size="sm"
            ml="8px"
            w="fit-content"
            type="date"
            defaultValue={formatISODate(tipoProcedimento?.dataFim)}
            {...register('dataFim')}
          />
        </Flex>
      </Flex>
      <FormularioSelect tipoProcedimento={tipoProcedimento} />
      <PublicosSelect tipoProcedimento={tipoProcedimento} />
    </Stack>
  )
}

export default Content
