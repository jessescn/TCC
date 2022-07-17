import {
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Input,
  Text
} from '@chakra-ui/react'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { ProcessoModel, RespostaCampo } from 'domain/models/processo'
import { AiFillWarning } from 'react-icons/ai'

type AnswerProps = {
  answer: RespostaCampo
  question: CampoFormulario
  isInvalid: boolean
  onInvalidate: (question: CampoFormulario) => void
}

const Answer = ({ answer, question, isInvalid, onInvalidate }: AnswerProps) => {
  return (
    <Flex align="center">
      <Text mr="8px" fontWeight="bold">
        {''}:
      </Text>
      <Input
        width="fit-content"
        isDisabled
        value={answer.valor}
        _disabled={{
          color: 'secondary.dark',
          fontWeight: 'bold',
          opacity: 1,
          bgColor: 'secondary.default'
        }}
      />
      <IconButton
        onClick={() => onInvalidate(question)}
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
  )
}

type Props = {
  processo: ProcessoModel
  invalidos: CampoFormulario[]
  setInvalidos: React.Dispatch<React.SetStateAction<CampoFormulario[]>>
  formulario: FormularioModel
}

const Content = ({ processo, invalidos, setInvalidos, formulario }: Props) => {
  const { respostas, camposInvalidos } = processo
  const perguntas = formulario.campos

  const resposta = respostas.find(value => value.formulario === formulario.id)

  function handleInvalidate(question: CampoFormulario) {
    const alreadyInvalid = invalidos.find(
      campo => campo.ordem === question.ordem
    )

    if (!alreadyInvalid) {
      setInvalidos([...invalidos, question])
      return
    }

    setInvalidos(prev => prev.filter(valor => valor.ordem !== question.ordem))
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
      {resposta?.campos.map(valor => {
        const question = perguntas.find(campo => campo.ordem === valor.ordem)
        const isInvalid = invalidos.find(campo => campo.ordem === valor.ordem)

        return !question ? null : (
          <GridItem colSpan={6}>
            <Answer
              question={question}
              answer={valor}
              isInvalid={!!isInvalid}
              onInvalidate={handleInvalidate}
            />
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default Content
