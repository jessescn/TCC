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
import { CampoParagrafo } from './patagrafo'

type Props = CampoFormulario<CampoTipoGrelhaMultipla>

export function CampoGrelhaMultipla(props: Props) {
  const { colunas, linhas } = props.configuracao_campo

  return (
    <Box>
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
          {linhas.map(linha => (
            <RadioGroup as="tr">
              <Td>{linha}</Td>
              {colunas.map(() => (
                <Td textAlign="center">
                  <Radio />
                </Td>
              ))}
            </RadioGroup>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
