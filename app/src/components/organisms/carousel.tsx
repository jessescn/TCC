import { Icon, IconButton } from '@chakra-ui/react'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { Carousel as ReactResponsiveCarousel } from 'react-responsive-carousel'

type Props = {
  children: JSX.Element[]
}

export default function Carousel(props: Props) {
  return (
    <ReactResponsiveCarousel
      renderArrowPrev={(clickHandler, hasNext) => (
        <IconButton
          variant="unstyled"
          top="45%"
          zIndex={100}
          display={hasNext ? 'initial' : 'none'}
          pos="absolute"
          aria-label="prev button"
          onClick={clickHandler}
          icon={<Icon as={GrPrevious} />}
        />
      )}
      renderArrowNext={(clickHandler, hasNext) => (
        <IconButton
          variant="unstyled"
          top="45%"
          right={0}
          zIndex={100}
          display={hasNext ? 'initial' : 'none'}
          pos="absolute"
          aria-label="next button"
          onClick={clickHandler}
          icon={<Icon as={GrNext} />}
        />
      )}
      showIndicators={false}
    >
      {props.children}
    </ReactResponsiveCarousel>
  )
}
