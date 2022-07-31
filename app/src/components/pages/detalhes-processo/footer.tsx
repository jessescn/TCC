/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import Votes, { VoteOption } from 'components/molecules/votes'
import { CampoFormulario } from 'domain/models/formulario'
import { useCallback, useState } from 'react'
import { selectors, useSelector } from 'store'
import InvalidFieldsModal from '../../organisms/modals/invalid-fields'

type Props = {
  invalidFields: CampoFormulario[]
}

const Footer = ({ invalidFields }: Props) => {
  const isColegiado = useSelector(selectors.session.is)('colegiado')
  const isCoordenacao = useSelector(selectors.session.is)('coordenador')

  const invalidFieldsModalControls = useDisclosure()

  const isProcessoInvalid = !invalidFields.length

  const [currentVote, setCurrentVote] = useState('' as VoteOption)

  const handleChangeVote = useCallback((vote: VoteOption) => {
    setCurrentVote(vote)
  }, [])

  const handleSendFeedback = useCallback((feedback: string) => {
    invalidFieldsModalControls.onClose()
  }, [])

  return (
    <>
      <Flex flexDir="column" align="center">
        <Flex w="100%" justifyContent="space-between">
          {isCoordenacao && (
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
          )}
          {isColegiado && (
            <Votes
              currentVote={currentVote}
              onVote={handleChangeVote}
              votes={{ no: 0, yes: 1 }}
            />
          )}
        </Flex>
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
