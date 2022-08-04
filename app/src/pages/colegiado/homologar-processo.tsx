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
import Comments from 'components/pages/homologar-processo/comments'
import Content from 'components/pages/homologar-processo/content'
import Footer from 'components/pages/homologar-processo/footer'
import Header from 'components/organisms/processo/header'
import { CampoFormulario } from 'domain/models/formulario'
import { useState } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { selectors, useSelector } from 'store'

import { motion } from 'framer-motion'

const HomologarProcesso = () => {
  const { id } = useParams()

  const processo = useSelector(state =>
    selectors.processo.getProcessoById(state)(Number(id))
  )

  const formularios = useSelector(state =>
    selectors.form.getFormulariosByProcesso(state)(processo)
  )

  const [showComments, setShowComments] = useState(false)
  const [hidden, setHidden] = useState(!showComments)
  const [invalidos, setInvalidos] = useState<CampoFormulario[]>([])

  const handleToggleComments = () => {
    setShowComments(prev => !prev)
  }

  return (
    <Screen py="24px" h="calc(100vh - 72px)">
      {!processo ? (
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
                processoId={processo.id}
                status={processo.status[processo.status.length - 1]?.status}
              />
            </Box>
            <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
            <Box height="50px" mb="8px">
              <Footer processo={processo} invalidFields={invalidos} />
            </Box>
            <Box height="calc(100% - 160px)">
              <Content
                processo={processo}
                invalidos={invalidos}
                setInvalidos={setInvalidos}
                formularios={formularios}
              />
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
                  <Comments processo={processo} />
                </Box>
              </motion.div>
            </Flex>
          </Box>
        </>
      )}
    </Screen>
  )
}

export default HomologarProcesso
