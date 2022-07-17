import { Box, Flex, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoEscolhaMultipla } from 'domain/types/campo-tipos'
import { useFormContext } from 'react-hook-form'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoEscolhaMultipla>

export function CampoEscolhaMultipla(props: Props) {
  const { setValue } = useFormContext()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, ...paragrafoProps } = props
  const { opcoes, outro } = props.configuracao_campo

  function handleChange(value: any) {
    setValue(`campo ${props.ordem}`, value)
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
                />
              </Flex>
            )}
          </Stack>
        </RadioGroup>
      </Box>
    </Box>
  )
}
