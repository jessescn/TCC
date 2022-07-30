import { Button, Flex } from '@chakra-ui/react'

type Props = {
  currentIdx: number
  isLastForm: boolean
  onClear: () => void
  onChangeForm: (idx: number) => void
}

export default function Footer({
  onChangeForm,
  currentIdx,
  isLastForm,
  onClear
}: Props) {
  const SubmitFooter = (
    <Button
      bgColor="primary.dark"
      color="initial.white"
      display="block"
      size="sm"
      type="submit"
    >
      Submeter Processo
    </Button>
  )

  const CurrentFooter = (
    <Flex justifyContent="flex-end">
      <Button
        bgColor="initial.white"
        borderColor="primary.dark"
        borderWidth={1}
        color="primary.dark"
        size="sm"
        mr="8px"
        onClick={() => onChangeForm(currentIdx - 1)}
        disabled={currentIdx <= 0}
      >
        Voltar
      </Button>
      <Button
        bgColor="primary.dark"
        color="initial.white"
        display="block"
        size="sm"
        disabled={isLastForm}
        onClick={() => onChangeForm(currentIdx + 1)}
      >
        Próximo Formulário
      </Button>
    </Flex>
  )

  return (
    <Flex justifyContent="space-between" mt="16px">
      <Button
        bgColor="initial.white"
        borderColor="primary.dark"
        borderWidth={1}
        color="primary.dark"
        size="sm"
        mr="8px"
        onClick={onClear}
      >
        Limpar formulário
      </Button>
      {isLastForm ? SubmitFooter : CurrentFooter}
    </Flex>
  )
}
