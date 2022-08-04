import { Box, Flex, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoEscolhaMultipla } from 'domain/types/campo-tipos'
import { useState } from 'react'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoEscolhaMultipla>

export function CampoEscolhaMultipla({ onUpdateResposta, ...props }: Props) {
  const [valorOutro, setValorOutro] = useState('')

  const { opcoes, outro } = props.configuracao_campo

  function handleChange(value: any) {
    const valor = value === 'outro' ? valorOutro : value

    onUpdateResposta({ ordem: props.ordem, valor })
  }

  return (
    <Box>
      <CampoParagrafo {...props} />
      <Box mt="16px">
        <RadioGroup onChange={handleChange}>
          <Stack spacing="16px">
            {opcoes.map(opcao => (
              <Radio
                isDisabled={!props.editable}
                value={opcao}
                key={opcao}
                display="block"
              >
                {opcao}
              </Radio>
            ))}
            {outro && (
              <Flex>
                <Radio value="outro" isDisabled={!props.editable}>
                  Outro:
                </Radio>
                <Input
                  disabled={!props.editable}
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
