import { Icon } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { AiOutlineUpload } from 'react-icons/ai'

export const UploadUsers = () => {
  return (
    <Button
      leftIcon={<Icon as={AiOutlineUpload} />}
      fontSize="14px"
      mb={0}
      px={6}
    >
      Importar Usuários
    </Button>
  )
}
