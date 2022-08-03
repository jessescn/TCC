import { Box, Divider, Flex, Spinner } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Content from 'components/pages/detalhes-processo/content'
import Header from 'components/organisms/processo/header'
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
            maxW="1392px"
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
            <Box height="calc(100% - 160px)">
              <Content processo={processo} formularios={formularios} />
            </Box>
          </Box>
        </>
      )}
    </Screen>
  )
}

export default DetalhesProcesso
