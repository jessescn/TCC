import { Icon, IconButton, Tooltip } from '@chakra-ui/react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const NavigationBackButton = () => {
  const navigate = useNavigate()

  return (
    <Tooltip label="Voltar">
      <IconButton
        aria-label="back-button"
        bgColor="transparent"
        _hover={{ bgColor: 'transparent' }}
        onClick={() => navigate(-1)}
        icon={<Icon as={MdArrowBackIosNew} />}
      />
    </Tooltip>
  )
}
