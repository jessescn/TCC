import { Center, Image, StyleProps, Text } from '@chakra-ui/react'

type Props = StyleProps & {
  side: 'left' | 'right'
}

const LogoPanel = ({ side, ...styleProps }: Props) => {
  const radius = side === 'left' ? '0.5rem 0 0 0.5rem' : '0 0.5rem 0.5rem 0'

  return (
    <Center
      flexDir={{ base: 'row', md: 'column' }}
      bgColor="primary.dark"
      borderRadius={{ base: '0.5rem 0.5rem 0 0', md: radius }}
      textAlign="center"
      w={{ base: '100%', md: '350px' }}
      p="2rem"
      {...styleProps}
    >
      <Image
        alt="ufcg logo"
        src="/logo_ufcg.png"
        maxW={{ base: '100px', md: '150px' }}
      />
      <Text
        mt={{ base: '1rem' }}
        fontWeight="bold"
        fontSize={{ base: 'lg' }}
        color="initial.white"
        maxW="200px"
      >
        Sistema de Pós-Graduação UFCG
      </Text>
    </Center>
  )
}

export default LogoPanel
