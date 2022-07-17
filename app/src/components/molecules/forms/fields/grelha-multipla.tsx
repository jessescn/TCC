import {
  Box,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoGrelhaMultipla } from 'domain/types/campo-tipos'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoGrelhaMultipla>

export function CampoGrelhaMultipla(props: Props) {
  const { colunas, linhas } = props.configuracao_campo

  return (
    <Box>
      <CampoParagrafo {...props} />
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            {colunas.map((coluna, idx) => (
              <Th key={`coluna-${idx}`} textAlign="center">
                {coluna}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {linhas.map((linha, idx) => (
            <RadioGroup as="tr">
              <Td key={`linha-${idx}`}>{linha}</Td>
              {colunas.map((_, colunaIdx) => (
                <Td textAlign="center" key={`linha-${idx}-${colunaIdx}`}>
                  <Radio value={`${idx}-${colunaIdx}`} />
                </Td>
              ))}
            </RadioGroup>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
