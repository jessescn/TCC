/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import Votes from 'components/molecules/votes'
import { CampoFormulario } from 'domain/models/formulario'
import { ProcessoModel } from 'domain/models/processo'
import { useCallback } from 'react'
import InvalidFieldsModal from '../../organisms/modals/invalid-fields'

type Props = {
  processo: ProcessoModel
  invalidFields: CampoFormulario[]
}

const Footer = ({ invalidFields, processo }: Props) => {
  // const isColegiado = useSelector(selectors.session.is)('colegiado')
  // const isCoordenacao = useSelector(selectors.session.is)('coordenador')
  const isColegiado = true
  const isCoordenacao = true

  const invalidFieldsModalControls = useDisclosure()

  const isProcessoInvalid = !invalidFields.length

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
          {isColegiado && <Votes processo={processo} />}
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
