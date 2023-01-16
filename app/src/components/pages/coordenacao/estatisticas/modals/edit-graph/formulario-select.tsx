import { Box, Text } from '@chakra-ui/react'
import { MultipleSelect, SelectOption } from 'components/atoms/multiple-select'
import { LoadingPage } from 'components/molecules/loading'
import { TipoCampoFormulario } from 'domain/models/formulario'
import { selectors, useSelector } from 'store'

type Props = {
  formularioId?: number
  campo?: string
  onChangeFormulario: (formId: number) => void
  onChangeCampo: (campo: string) => void
}

export default function FormularioSelect({
  onChangeCampo,
  onChangeFormulario,
  formularioId,
  campo
}: Props) {
  const tipoProcedimento = useSelector(
    selectors.tipoProcedimentoDetalhes.getTipoProcedimento
  )
  const isLoading = useSelector(
    selectors.tipoProcedimentoDetalhes.isLoadingContent
  )
  const formularios = useSelector(
    selectors.tipoProcedimentoDetalhes.getFormulariosFromTipo
  )
  const formulario = formularios.find(form => form.id === formularioId)
  const options: SelectOption[] = formularios.map(form => ({
    value: form.id,
    label: `${form.nome} (id: ${form.id})`
  }))

  const tipoCamposValidos: TipoCampoFormulario[] = [
    'hora',
    'data',
    'caixa_verificacao',
    'escolha_multipla',
    'grelha_multipla',
    'grelha_verificacao'
  ]

  const campoOptions = (formulario?.campos || [])
    .filter(value => tipoCamposValidos.includes(value.tipo))
    .map(value => ({
      label: value.configuracao_campo.titulo,
      value: value.configuracao_campo.titulo
    }))

  function handleChangeForm(e: SelectOption) {
    onChangeFormulario(e.value)
  }

  if (isLoading) {
    return <LoadingPage default />
  }

  return !tipoProcedimento ? null : (
    <>
      <Box>
        <Text my="0.5rem" fontSize="14px">
          Selecione o formulário:
        </Text>
        <MultipleSelect
          isDisabled={isLoading}
          isLoading={isLoading}
          options={options}
          value={
            formulario
              ? options.find(option => option.value === formulario?.id)
              : undefined
          }
          onChange={e => handleChangeForm(e as SelectOption)}
        />
      </Box>
      {formulario && (
        <Box>
          <Text my="0.5rem" fontSize="14px">
            Selecione o campo:
          </Text>
          <MultipleSelect
            isDisabled={!tipoProcedimento || !formulario}
            options={campoOptions}
            value={campoOptions.find(option => option.value === campo)}
            onChange={e => onChangeCampo(e?.value)}
          />
        </Box>
      )}
    </>
  )
}
