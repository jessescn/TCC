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
      p="16px"
      {...styleProps}
    >
      <Image
        alt="ufcg logo image"
        src="./logo_ufcg.png"
        maxW={{ base: '100px', md: '150px' }}
        mr="16px"
      />
      <Text
        mt={{ base: '0', md: '24px' }}
        fontWeight="bold"
        fontSize={{ base: '20px', md: '24px' }}
        color="initial.white"
        maxW="200px"
      >
        Sistema de Pós-Graduação UFCG
      </Text>
    </Center>
  )
}

export default LogoPanel
