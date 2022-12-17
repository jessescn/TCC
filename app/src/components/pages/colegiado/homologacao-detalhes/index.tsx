import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Select,
  Stack,
  Text
} from '@chakra-ui/react'
import Formulario from 'components/organisms/procedimento-render/formulario'
import Header from 'components/organisms/procedimento-render/header'
import { useEffect, useRef, useState } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { selectors, useSelector } from 'store'
import { getCurrentStatus } from 'utils/procedimento'

import { FormularioModel } from 'domain/models/formulario'
import { motion } from 'framer-motion'
import ListaComentarios from './comentarios'
import Votacao from './votacao'

export default function HomologarProcedimentoDetails() {
  const procedimento = useSelector(
    selectors.procedimentoDetalhes.getProcedimento
  )
  const firstLoad = useRef(false)
  const formularios = useSelector(selectors.procedimentoDetalhes.getFormularios)

  const [showComments, setShowComments] = useState(false)
  const [hidden, setHidden] = useState(!showComments)

  const handleToggleComments = () => {
    setShowComments(prev => !prev)
  }

  const [formularioSelecionado, setFormularioSelecionado] = useState<
    FormularioModel | undefined
  >()

  useEffect(() => {
    if (formularios.length === 0 || firstLoad.current) return

    setFormularioSelecionado(formularios[0])
    firstLoad.current = true
  }, [formularios])

  function handleSelectFormulario(option: string) {
    const novoFormularioSelecionado = formularios.find(
      formulario => formulario.id === Number(option)
    )

    if (!novoFormularioSelecionado) {
      return
    }

    setFormularioSelecionado(novoFormularioSelecionado)
  }

  const status = procedimento ? getCurrentStatus(procedimento) : undefined

  return !procedimento ? null : (
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
        <Header procedimento={procedimento} status={status} />
      </Box>
      <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
      <Box minH="80%">
        <Box>
          <Flex justifyContent="space-between">
            <Stack spacing="16px">
              <Flex alignItems="center">
                <Text fontSize="14px" mr="8px" fontWeight="bold">
                  Nome:
                </Text>
                <Text fontSize="12px">
                  {procedimento.tipo_procedimento?.nome}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="14px" fontWeight="bold" mr="8px">
                  Formulário:
                </Text>
                <Select
                  size="xs"
                  maxW="600px"
                  onChange={e => handleSelectFormulario(e.target.value)}
                >
                  {formularios.map(formulario => (
                    <option value={`${formulario.id}`} key={formulario.id}>
                      {formulario.nome}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Stack>
            <Votacao procedimento={procedimento} />
          </Flex>
          <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
          <Box>
            {formularioSelecionado && (
              <Formulario
                formulario={formularioSelecionado}
                procedimento={procedimento}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Flex mt="8px">
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
            <ListaComentarios procedimento={procedimento} />
          </Box>
        </motion.div>
      </Flex>
    </Box>
  )
}
