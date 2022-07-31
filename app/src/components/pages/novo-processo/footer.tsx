import { Box, Button, Flex } from '@chakra-ui/react'

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
  const SubmitButton = (
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

  const NextButton = (
    <Button
      as={Box}
      bgColor="primary.dark"
      color="initial.white"
      cursor="pointer"
      size="sm"
      onClick={() => onChangeForm(currentIdx + 1)}
    >
      Próximo Formulário
    </Button>
  )

  return (
    <Flex justifyContent="flex-end" mt="16px">
      {/* <Button
        bgColor="initial.white"
        borderColor="primary.dark"
        borderWidth={1}
        color="primary.dark"
        size="sm"
        mr="8px"
        onClick={onClear}
      >
        Limpar formulário
      </Button> */}
      <Flex justifyContent="flex-end">
        {currentIdx > 0 && (
          <Button
            bgColor="initial.white"
            borderColor="primary.dark"
            borderWidth={1}
            color="primary.dark"
            size="sm"
            mr="8px"
            onClick={() => onChangeForm(currentIdx - 1)}
          >
            Voltar
          </Button>
        )}
        {isLastForm ? SubmitButton : NextButton}
      </Flex>
    </Flex>
  )
}
