import { Box, Flex, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoEscolhaMultipla } from 'domain/types/campo-tipos'
import { useState } from 'react'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoEscolhaMultipla>

export function CampoEscolhaMultipla(props: Props) {
  const { onUpdateResposta, ...paragrafoProps } = props

  const [valorOutro, setValorOutro] = useState('')

  const { opcoes, outro } = props.configuracao_campo

  function handleChange(value: any) {
    const valor = value === 'outro' ? valorOutro : value

    onUpdateResposta({ ordem: props.ordem, valor })
  }

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      <Box mt="16px">
        <RadioGroup onChange={handleChange}>
          <Stack spacing="16px">
            {opcoes.map(opcao => (
              <Radio value={opcao} key={opcao} display="block">
                {opcao}
              </Radio>
            ))}
            {outro && (
              <Flex>
                <Radio value="outro">Outro:</Radio>
                <Input
                  ml="16px"
                  variant="unstyled"
                  borderBottom="1px solid #000"
                  borderRadius={0}
                  onChange={ev => setValorOutro(ev.target.value)}
                  value={valorOutro}
                />
              </Flex>
            )}
          </Stack>
        </RadioGroup>
      </Box>
    </Box>
  )
}
