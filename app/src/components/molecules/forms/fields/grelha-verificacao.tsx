import {
  Box,
  Checkbox,
  CheckboxGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoGrelhaVerificacao } from 'domain/types/campo-tipos'
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { BaseCampoProps } from '.'
import { ErrorWrapper } from './error-wrapper'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoGrelhaVerificacao>

export function CampoGrelhaVerificacao({
  onUpdateResposta,
  formulario,
  ...props
}: Props) {
  const { setError, clearErrors } = useFormContext()
  const campo = useGetValorCampo(formulario, props.ordem)

  const currentValue: number[][][] = campo?.valor || []

  const fieldName = `field${props.ordem}`

  const { colunas, linhas } = props.configuracao_campo

  function handleChange(value: string[], row: number) {
    const parsedValue: number[][] = value.map(stringValue =>
      JSON.parse(stringValue)
    ) // [0, 0]

    const idx = currentValue.findIndex(value => {
      return value?.[0]?.[0] === row
    })

    if (idx === -1) {
      onUpdateResposta({
        ordem: props.ordem,
        valor: [...currentValue, parsedValue]
      })
      return
    }

    const copyValue = JSON.parse(JSON.stringify(currentValue))

    copyValue.splice(idx, 1, parsedValue)
    onUpdateResposta({
      ordem: props.ordem,
      valor: copyValue
    })
  }

  function getCurrentValuesByRow(rowIdx: number) {
    const values = currentValue.find(valor => valor?.[0]?.[0] === rowIdx) || []

    return values.map(value => `[${value?.[0]},${value?.[1]}]`)
  }

  useEffect(() => {
    if (!props.obrigatorio) return

    const isInvalid = false

    if (isInvalid) {
      setError(fieldName, { message: 'Selecione ao menos uma opção por linha' })
    } else {
      clearErrors(fieldName)
    }
  }, [campo])

  return (
    <ErrorWrapper fieldName={fieldName}>
      <CampoParagrafo {...props} />
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            {colunas.map(coluna => (
              <Th textAlign="center">{coluna}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {linhas.map((linha, idx) => (
            <CheckboxGroup
              key={`${campo?.ordem}-linha-${idx}`}
              onChange={(value: string[]) => handleChange(value, idx)}
              defaultValue={getCurrentValuesByRow(idx)}
            >
              <Tr>
                <Td>{linha}</Td>
                {colunas.map((_, colunaIdx) => (
                  <Td
                    textAlign="center"
                    key={`${campo?.ordem}-linha-${idx}-${colunaIdx}`}
                  >
                    <Checkbox
                      disabled={!props.editable}
                      value={`[${idx},${colunaIdx}]`}
                    />
                  </Td>
                ))}
              </Tr>
            </CheckboxGroup>
          ))}
        </Tbody>
      </Table>
    </ErrorWrapper>
  )
}
