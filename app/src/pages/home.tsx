import { Box, Center, Image, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'

export default function Home() {
  return (
    <Screen py="24px" height="fit-content">
      <Box
        w="100%"
        h="100%"
        maxW="1392px"
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
        <Box mt="50px">
          <Text color="primary.dark" fontSize="18px" fontWeight="bold">
            Novo Sistema de Processos da Pós-Graduacão
          </Text>
          <Text my="16px" fontSize="14px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a
            semper tortor. Fusce ut laoreet dui, sed ultricies mauris. Nulla ut
            elementum leo, non suscipit mi. Duis posuere euismod tempor. Donec
            faucibus sed lectus ut imperdiet. In vitae elementum risus, vitae
            maximus tortor. Aliquam erat volutpat. Mauris rhoncus suscipit nisl
            in cursus. Maecenas facilisis velit nibh, ac vestibulum ligula
            facilisis sit amet. Mauris nec ipsum tortor. Aliquam erat volutpat.
            Vivamus pulvinar velit ut risus malesuada sagittis. Aliquam in lacus
            in risus luctus egestas sed ac tellus. Cras sit amet risus non
            tortor eleifend placerat. Aliquam fringilla ligula at facilisis
            varius.
          </Text>
        </Box>
      </Box>
    </Screen>
  )
}
