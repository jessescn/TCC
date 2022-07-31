import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Input,
  Stack
} from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoCaixaVerificacao } from 'domain/types/campo-tipos'
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { useState } from 'react'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoCaixaVerificacao>

export function CampoCaixaVerificacao({
  onUpdateResposta,
  formulario,
  ...props
}: Props) {
  const { opcoes, outro } = props.configuracao_campo

  const [valorOutro, setValorOutro] = useState('')
  const campo = useGetValorCampo(formulario, props.ordem)

  function handleChange(value: any) {
    const valor = value === 'outro' ? valorOutro : value
    onUpdateResposta({ ordem: props.ordem, valor })
  }

  return (
    <Box>
      <CampoParagrafo {...props} />
      <Box mt="16px">
        <CheckboxGroup
          onChange={handleChange}
          defaultValue={campo?.valor || []}
        >
          <Stack spacing="16px">
            {opcoes.map(opcao => (
              <Checkbox key={opcao} value={opcao}>
                {opcao}
              </Checkbox>
            ))}
            {outro && (
              <Flex>
                <Checkbox value={'outro'}>Outro:</Checkbox>
                <Input
                  ml="16px"
                  variant="unstyled"
                  borderBottom="1px solid #000"
                  borderRadius={0}
                  value={valorOutro}
                  onChange={ev => setValorOutro(ev.target.value)}
                />
              </Flex>
            )}
          </Stack>
        </CheckboxGroup>
      </Box>
    </Box>
  )
}
