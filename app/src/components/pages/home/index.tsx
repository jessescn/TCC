import { Box, Center, Image, Stack, Text } from '@chakra-ui/react'
import { Container } from 'components/atoms/container'
import { ProfileType } from 'domain/models/user'
import { selectors, useSelector } from 'store'
import FormulariosInfoCard from './guides/formularios'
import HomologacaoInfoCard from './guides/homologacao'
import ProcedimentosInfoCard from './guides/procedimentos'
import TipoProcedimentosInfoCard from './guides/tipo-procedimentos'

export default function Home() {
  const currentActorProfile = useSelector(
    selectors.session.getCurrentActorProfile
  )

  const simpleGuide = [<ProcedimentosInfoCard />]
  const colegiadoGuide = [<ProcedimentosInfoCard />, <HomologacaoInfoCard />]
  const completeGuide = [
    <FormulariosInfoCard />,
    <TipoProcedimentosInfoCard />,
    <ProcedimentosInfoCard />,
    <HomologacaoInfoCard />
  ]

  const guides: Record<ProfileType, JSX.Element[]> = {
    admin: completeGuide,
    coordenacao: completeGuide,
    colegiado: colegiadoGuide,
    secretaria: colegiadoGuide,
    usuario: simpleGuide
  }

  return (
    <Container maxW="900px">
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
          Sistema de Automação de Procedimentos
        </Text>
      </Box>
      <Box my="2rem">
        <Text fontWeight="bold" mb="0.5rem">
          Sobre o Sistema
        </Text>
        <Text fontSize="sm">
          O sistema de automação de procedimentos da PPGCC tem como objetivo
          centralizar e facilitar o acompanhamentos dos procedimentos dos
          discentes e docentes do curso de ciência da computação da UFCG.
        </Text>
      </Box>
      <Box my="1rem">
        <Text fontWeight="bold" mb="0.5rem">
          Guia
        </Text>
        <Text fontSize="sm">
          Para entender o sistema como um todo, recomendamos reservar alguns
          minutos para ler este guia rápido sobre as partes do sistema e as
          funcionalidades disponíveis.
        </Text>
      </Box>
      <Stack spacing="1rem" alignItems="center">
        {currentActorProfile ? guides[currentActorProfile] : []}
      </Stack>
    </Container>
  )
}
