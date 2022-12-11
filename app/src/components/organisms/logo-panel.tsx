import { Center, Image, StyleProps, Text } from '@chakra-ui/react'

type Props = StyleProps & {
  side: 'left' | 'right'
}

const LogoPanel = ({ side, ...styleProps }: Props) => {
  const radius = side === 'left' ? '8px 0 0 8px' : '0 8px 8px 0'

  return (
    <Center
      flexDir={{ base: 'row', md: 'column' }}
      bgColor="primary.dark"
      borderRadius={{ base: '8px 8px 0 0', md: radius }}
      textAlign="center"
      w={{ base: '100%', md: '350px' }}
      p="32px"
      {...styleProps}
    >
      <Image
        alt="ufcg logo"
        src="./logo_ufcg.png"
        maxW={{ base: '100px', md: '150px' }}
      />
      <Text
        mt={{ base: '16px' }}
        fontWeight="bold"
        fontSize={{ base: '20px' }}
        color="initial.white"
        maxW="200px"
      >
        Sistema de Pós-Graduação UFCG
      </Text>
    </Center>
  )
}

export default LogoPanel
