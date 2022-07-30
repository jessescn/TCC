import { Button, Flex } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const Footer = () => {
  const {
    formState: { isDirty }
  } = useFormContext()

  return (
    <Flex justifyContent="flex-end">
      <Button
        bgColor="primary.dark"
        color="initial.white"
        size="sm"
        mt="16px"
        type="submit"
        isDisabled={!isDirty}
      >
        Salvar
      </Button>
    </Flex>
  )
}

export default Footer
