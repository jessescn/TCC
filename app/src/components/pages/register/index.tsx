import { Flex } from '@chakra-ui/react'
import LogoPanel from 'components/organisms/logo-panel'
import { selectors, useSelector } from 'store'
import { ConfirmEmailContent } from './confirm-email-content'
import { RegisterFormContent } from './register-form-content'

export const Content = () => {
  const createStatus = useSelector(selectors.user.getStatusCreate)

  const content =
    createStatus.status === 'success' ? (
      <ConfirmEmailContent />
    ) : (
      <RegisterFormContent />
    )

  return (
    <Flex
      w="100%"
      maxW="800px"
      bgColor="initial.white"
      borderRadius="8px"
      flexDirection={{ base: 'column-reverse', md: 'row' }}
    >
      {content}
      <LogoPanel side="right" />
    </Flex>
  )
}
