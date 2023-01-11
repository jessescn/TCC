import { Center, Spinner } from '@chakra-ui/react'
import animationData from 'animations/loading.json'
import Lottie from 'react-lottie'

type Props = {
  default?: boolean
}

export const LoadingPage = (props: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Center w="100%" h="100%" py="1.5rem">
      {props.default ? (
        <Spinner />
      ) : (
        <Lottie options={defaultOptions} height={100} width={100} />
      )}
    </Center>
  )
}
