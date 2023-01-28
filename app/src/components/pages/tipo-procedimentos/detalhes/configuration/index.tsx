import {
  Box,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'
import { ErrorMessage } from 'components/molecules/forms/error-message'
import { InfoIcon } from 'components/molecules/info'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'
import { formatISODateToLocalTime } from 'utils/format'
import FormularioSelect from './formularios-select'
import PublicosSelect from './publicos-select'

export default function TipoProcedimentoConfiguration() {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext()

  const tipoProcedimento = useSelector(
    selectors.tipoProcedimentoDetalhes.getTipoProcedimento
  )

  return (
    <Stack spacing="1rem">
      <Box alignItems="center">
        <Text fontSize="sm" mb="0.5rem" fontWeight="bold">
          Nome
        </Text>
        <Input
          isInvalid={errors['nome']}
          defaultValue={tipoProcedimento?.nome}
          size="sm"
          {...register('nome', {
            required: { value: true, message: 'Nome obrigatório' }
          })}
        />
        <ErrorMessage errors={errors} fieldName="nome" />
      </Box>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Text fontSize="14px" fontWeight="bold">
              Colegiado
            </Text>
            <InfoIcon label="Marque sim caso necessite que o procedimento seja aprovado pelo colegiado." />
          </Flex>
          <Select ml="8px" w="fit-content" size="sm" {...register('colegiado')}>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </Select>
        </Flex>
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Text fontSize="14px" fontWeight="bold">
              Revisão Coordenação
            </Text>
            <InfoIcon label="Marque sim caso necessite que o procedimento seja revisado pela coordenação após ser criado." />
          </Flex>
          <Select
            ml="8px"
            w="fit-content"
            size="sm"
            {...register('revisao_coordenacao')}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </Select>
        </Flex>
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Text fontSize="14px" fontWeight="bold">
              Status
            </Text>
            <InfoIcon label="Somente tipos de procedimento com status 'ativo' são listados para os usuários." />
          </Flex>
          <Select ml="8px" w="fit-content" size="sm" {...register('status')}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </Select>
        </Flex>
      </Flex>
      <Flex>
        <Flex alignItems="center" w="50%">
          <Text fontSize="14px" fontWeight="bold">
            Data início
          </Text>
          <Input
            size="sm"
            ml="8px"
            w="fit-content"
            type="datetime-local"
            max={watch('dataFim')}
            defaultValue={formatISODateToLocalTime(new Date().toISOString())}
            {...register('dataInicio')}
          />
        </Flex>
        <Flex alignItems="center">
          <Text fontSize="14px" fontWeight="bold">
            Data Fim
          </Text>
          <Input
            size="sm"
            ml="8px"
            w="fit-content"
            type="datetime-local"
            defaultValue={formatISODateToLocalTime(new Date().toISOString())}
            min={watch('dataInicio')}
            {...register('dataFim')}
          />
        </Flex>
      </Flex>
      <FormularioSelect />
      <PublicosSelect />
    </Stack>
  )
}
