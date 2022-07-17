import { Button, Flex } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Flex w="100%" justifyContent="space-between" mt="24px">
      <Button
        color="initial.black"
        bgColor="transparent"
        fontSize="14px"
        _hover={{ bgColor: '#D3D3D3' }}
      >
        Limpar formulário
      </Button>
      <Button
        color="initial.white"
        bgColor="primary.dark"
        fontSize="14px"
        _hover={{ bgColor: 'primary.default' }}
      >
        Enviar
      </Button>
    </Flex>
  )
}
