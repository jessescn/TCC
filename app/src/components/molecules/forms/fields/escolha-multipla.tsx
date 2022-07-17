import { Box, Flex, Input, Radio, RadioGroup } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoEscolhaMultipla } from 'domain/types/campo-tipos'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoEscolhaMultipla>

export function CampoEscolhaMultipla(props: Props) {
  const { register, ...paragrafoProps } = props
  const { opcoes, outro } = props.configuracao_campo

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      <RadioGroup
        {...register}
        onChange={value => register.onChange({ target: { value } })}
      >
        {opcoes.map(opcao => (
          <Radio value={opcao} key={opcao} display="block" my="16px">
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
      </RadioGroup>
    </Box>
  )
}
