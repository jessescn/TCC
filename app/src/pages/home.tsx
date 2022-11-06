import { Box, Center, Image, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import { useStore } from 'hooks/useStore'

export default function Home() {
  useStore(['tipoProcedimento'])

  return (
    <Screen py="24px" height="fit-content">
      <Box
        w="100%"
        h="100%"
        maxW="1200px"
        bgColor="initial.white"
        borderRadius="8px"
        px="24px"
        py="32px"
      >
        <Center flexDir="column">
          <Image
            alt="ufcg logo image"
            src="./logo_ufcg.png"
            maxW={{ base: '50px', md: '100px' }}
            mr="16px"
          />
          <Text mt="16px" fontSize="28px" textAlign="center" maxW="800px">
            Universidade Federal de Campina Grande Pró-Reitoria de Ensino
            Coordenação de Controle Acadêmico Histórico Acadêmico
          </Text>
        </Center>
        <Box mt="90px">
          <Text
            textAlign="center"
            color="primary.dark"
            fontSize="18px"
            fontWeight="bold"
          >
            Novo Sistema de Procedimentos da Pós-Graduacão
          </Text>
        </Box>
      </Box>
    </Screen>
  )
}
