import { Box, Divider, Flex, Spinner } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Comments from 'components/pages/detalhes-processo/comments'
import Footer from 'components/pages/detalhes-processo/footer'
import Header from 'components/pages/detalhes-processo/header'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

const DetalhesProcesso = () => {
  const { id } = useParams()

  const processo = useSelector(state =>
    !id ? undefined : selectors.processo.getProcessoById(state)(+id)
  )

  useEffect(() => {
    store.dispatch(actions.processo.list())
  }, [])

  const [showComments, setShowComments] = useState(true)

  const handleToggleComments = () => {
    setShowComments(prev => !prev)
  }

  const handleComment = (comment: string) => {
    return null // TODO: call action to create comment
  }

  return (
    <Screen py="24px" flexDir="column">
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
            <Header processoId={processo.id} status={processo.status} />
            <Divider borderWidth="2px" borderColor="#EEE" my="16px" />
            <Footer
              onTogleComments={handleToggleComments}
              isCommentsVisible={showComments}
            />
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
