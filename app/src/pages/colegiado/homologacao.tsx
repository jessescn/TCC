import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Spinner,
  Tooltip
} from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Comments from 'components/pages/colegiado/homologacao/comments'
import Content from 'components/pages/colegiado/homologacao/content'
import Header from 'components/organisms/procedimento/header'
import { useState } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { selectors, useSelector } from 'store'

import { motion } from 'framer-motion'
import { getCurrentStatus } from 'utils/procedimento'

const HomologarProcedimento = () => {
  const { id } = useParams()

  const procedimento = useSelector(state =>
    selectors.procedimento.getProcedimentoById(state)(Number(id))
  )

  const formularios = useSelector(state =>
    selectors.formulario.getFormulariosByProcedimento(state)(procedimento)
  )

  const [showComments, setShowComments] = useState(false)
  const [hidden, setHidden] = useState(!showComments)

  const handleToggleComments = () => {
    setShowComments(prev => !prev)
  }

  return (
    <Screen py="24px" h="auto">
      {!procedimento ? (
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Box
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.2)"
            w="100%"
            h="100%"
            maxW="1200px"
            bgColor="initial.white"
            borderRadius="8px"
            px="24px"
            py="32px"
            position="relative"
          >
            <Box height="50px">
              <Header
                procedimento={procedimento}
                status={getCurrentStatus(procedimento)}
              />
            </Box>
            <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
            <Box minH="85%">
              <Content procedimento={procedimento} formularios={formularios} />
            </Box>
            <Flex mt="8px">
              <Tooltip label="Comentários">
                <Button
                  size="sm"
                  bgColor="primary.dark"
                  aria-label=""
                  color="initial.white"
                  onClick={handleToggleComments}
                  _hover={{ bgColor: 'primary.default' }}
                  leftIcon={<Icon color="#fff" as={BiCommentDetail} />}
                >
                  Comentários
                </Button>
              </Tooltip>
              <motion.div
                hidden={hidden}
                initial={false}
                onAnimationStart={() => setHidden(false)}
                onAnimationComplete={() => setHidden(!showComments)}
                animate={{ width: showComments ? 400 : 0 }}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  zIndex: 10,
                  height: '100%',
                  backgroundColor: '#FFF',
                  boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.2)'
                }}
              >
                <Box width="400px" py="8px" px="16px" height="100%">
                  <Comments procedimento={procedimento} />
                </Box>
              </motion.div>
            </Flex>
          </Box>
        </>
      )}
    </Screen>
  )
}

export default HomologarProcedimento
