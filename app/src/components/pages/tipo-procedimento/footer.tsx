import { Button, Flex } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex justifyContent="flex-end">
      <Button
        bgColor="primary.dark"
        color="initial.white"
        size="sm"
        mt="16px"
        type="submit"
      >
        Salvar
      </Button>
    </Flex>
  )
}

export default Footer
