import { Box, Divider, Flex, Spinner } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Comments from 'components/pages/detalhes-processo/comments'
import Content from 'components/pages/detalhes-processo/content'
import Footer from 'components/pages/detalhes-processo/footer'
import Header from 'components/pages/detalhes-processo/header'
import { CampoFormulario } from 'domain/models/formulario'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectors, useSelector } from 'store'

const DetalhesProcesso = () => {
  const { id } = useParams()

  const processo = useSelector(state =>
    selectors.processo.getProcessoById(state)(Number(id))
  )

  const formularios = useSelector(state =>
    selectors.form.getFormulariosByProcesso(state)(processo)
  )

  const [showComments, setShowComments] = useState(false)
  const [invalidos, setInvalidos] = useState<CampoFormulario[]>([])

  const handleToggleComments = () => {
    setShowComments(prev => !prev)
  }

  const handleComment = (comment: string) => {
    return null // TODO: call action to create comment
  }

  return (
    <Screen py="24px" flexDir="column" alignItems="center">
      {!processo ? (
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Box
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.2)"
            w="100%"
            h={!showComments ? '100%' : '60%'}
            maxW="1392px"
            bgColor="initial.white"
            borderRadius="8px"
            px="24px"
            py="32px"
          >
            <Box height="50px">
              <Header processoId={processo.id} status={processo.status} />
            </Box>
            <Divider borderWidth="2px" borderColor="#EEE" my="16px" />
            <Box height="calc(100% - 130px)">
              <Content
                processo={processo}
                invalidos={invalidos}
                setInvalidos={setInvalidos}
                formularios={formularios}
              />
            </Box>
            <Box height="80px">
              <Footer
                invalidFields={invalidos}
                onTogleComments={handleToggleComments}
                isCommentsVisible={showComments}
              />
            </Box>
          </Box>
          {showComments && (
            <Box height="40%" w="100%" maxW="1392px">
              <Comments onComment={handleComment} />
            </Box>
          )}
        </>
      )}
    </Screen>
  )
}

export default DetalhesProcesso
