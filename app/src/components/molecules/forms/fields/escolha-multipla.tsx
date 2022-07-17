import { Box, Flex, Input, Radio, RadioGroup } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoEscolhaMultipla } from 'domain/types/campo-tipos'
import { CampoParagrafo } from './patagrafo'

type Props = CampoFormulario<CampoTipoEscolhaMultipla>

export function CampoEscolhaMultipla(props: Props) {
  const { opcoes, outro } = props.configuracao_campo

  return (
    <Box>
      <CampoParagrafo {...props} />
      <RadioGroup>
        {opcoes.map(opcao => (
          <Radio>{opcao}</Radio>
        ))}
        {outro && (
          <Flex>
            <Radio>Outro:</Radio>
            <Input
              ml="16px"
              variant="unstyled"
              borderBottom="1px solid #000"
              borderRadius={0}
            />
          </Flex>
        )}
      </RadioGroup>
    </Box>
  )
}
