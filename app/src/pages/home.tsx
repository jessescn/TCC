import { Box, Center, Image, Text } from '@chakra-ui/react'
import { Container } from 'components/atoms/container'
import Screen from 'components/atoms/screen'

export default function Home() {
  return (
    <Screen py="1.5rem" height="fit-content">
      <Container>
        <Center flexDir="column">
          <Image
            alt="ufcg logo image"
            src="./logo_ufcg.png"
            maxW={{ base: '50px', md: '100px' }}
          />
          <Text mt="1rem" fontSize="2xl" textAlign="center" maxW="800px">
            Universidade Federal de Campina Grande Pró-Reitoria de Ensino
            Coordenação de Controle Acadêmico Histórico Acadêmico
          </Text>
        </Center>
        <Box mt="4rem">
          <Text
            textAlign="center"
            color="primary.dark"
            fontSize="lg"
            fontWeight="bold"
          >
            Sistema de Procedimentos da Pós-Graduacão
          </Text>
        </Box>
      </Container>
    </Screen>
  )
}
