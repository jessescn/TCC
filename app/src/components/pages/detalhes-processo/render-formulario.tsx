import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Input,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { ProcessoModel, RespostaCampo } from 'domain/models/processo'
import { AiFillWarning } from 'react-icons/ai'

type RespostaProps = {
  resposta?: RespostaCampo
  pergunta: CampoFormulario
  isInvalid: boolean
  onInvalidate: (question: CampoFormulario) => void
}

const Resposta = ({
  resposta,
  pergunta,
  isInvalid,
  onInvalidate
}: RespostaProps) => {
  const textoPergunta =
    pergunta.configuracao_campo.titulo ||
    pergunta.configuracao_campo.descricao ||
    ''

  return pergunta.tipo == 'paragrafo' ? null : (
    <Box>
      <Tooltip label={textoPergunta}>
        <Text
          noOfLines={2}
          mr="8px"
          fontWeight="bold"
          fontSize="12px"
          mb="12px"
        >
          {textoPergunta}:
        </Text>
      </Tooltip>
      <Flex>
        <Input
          w="100%"
          size="sm"
          isDisabled
          value={resposta?.valor || ''}
          _disabled={{
            color: 'secondary.dark',
            fontWeight: 'bold',
            opacity: 1,
            bgColor: 'secondary.default'
          }}
        />
        <IconButton
          onClick={() => onInvalidate(pergunta)}
          aria-label=""
          bgColor="initial.white"
          ml="8px"
          variant="unstyled"
          icon={
            <Icon
              as={AiFillWarning}
              color={isInvalid ? 'info.error' : 'initial.black'}
            />
          }
        />
      </Flex>
    </Box>
  )
}

type Props = {
  formulario: FormularioModel
  processo: ProcessoModel
  handleInvalidate: (question: CampoFormulario) => void
}

export default function RenderFormulario({
  formulario,
  processo,
  handleInvalidate
}: Props) {
  const invalidos = processo.camposInvalidos

  const respostaFormulario = processo.respostas.find(
    resposta => resposta.formulario === formulario.id
  )

  const respostas = respostaFormulario?.campos || []

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      gap={2}
      overflowY="scroll"
      maxH="500px"
      h="100%"
      pr="10px"
    >
      {formulario.campos.map(pergunta => {
        const resposta = respostas.find(campo => campo.ordem === pergunta.ordem)
        const isInvalid = invalidos.find(
          campo => campo.ordem === pergunta.ordem
        )

        return (
          <GridItem colSpan={12}>
            <Resposta
              pergunta={pergunta}
              resposta={resposta}
              isInvalid={!!isInvalid}
              onInvalidate={handleInvalidate}
            />
          </GridItem>
        )
      })}
    </Grid>
  )
}
