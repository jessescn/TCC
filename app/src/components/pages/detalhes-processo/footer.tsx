/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Flex, Link, useDisclosure } from '@chakra-ui/react'
import Votes, { VoteOption } from 'components/molecules/votes'
import { CampoFormulario } from 'domain/models/formulario'
import { useCallback, useState } from 'react'
import InvalidFieldsModal from '../modals/invalid-fields'

type Props = {
  isCommentsVisible: boolean
  onTogleComments: () => void
  invalidFields: CampoFormulario[]
}

const Footer = ({
  onTogleComments,
  isCommentsVisible,
  invalidFields
}: Props) => {
  const invalidFieldsModalControls = useDisclosure()

  const isProcessoInvalid = !invalidFields.length

  const [currentVote, setCurrentVote] = useState('' as VoteOption)

  const handleChangeVote = useCallback((vote: VoteOption) => {
    setCurrentVote(vote)
  }, [])

  const handleSendFeedback = useCallback((feedback: string) => {
    console.log(feedback)
    invalidFieldsModalControls.onClose()
  }, [])

  return (
    <>
      <Flex flexDir="column" align="center">
        <Flex w="100%" justifyContent="space-between">
          <Button
            bgColor="transparent"
            color="info.error"
            borderWidth="2px"
            fontSize="12px"
            borderColor="info.error"
            _hover={{
              color: 'initial.white',
              bgColor: 'info.error'
            }}
            px="20px"
            py="6px"
            isDisabled={isProcessoInvalid}
            onClick={() => invalidFieldsModalControls.onOpen()}
          >
            Alertar
          </Button>
          <Votes
            currentVote={currentVote}
            onVote={handleChangeVote}
            votes={{ no: 0, yes: 1 }}
          />
        </Flex>
        <Link
          onClick={onTogleComments}
          fontSize="12px"
          fontWeight="bold"
          textDecor="underline"
        >
          {!isCommentsVisible ? 'Mostrar comentários' : 'Ocultar comentários'}
        </Link>
      </Flex>
      <InvalidFieldsModal
        invalidFields={invalidFields}
        isOpen={invalidFieldsModalControls.isOpen}
        onClose={invalidFieldsModalControls.onClose}
        onSendFeedback={handleSendFeedback}
      />
    </>
  )
}

export default Footer
