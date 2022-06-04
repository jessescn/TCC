import { Button, Icon, IconButton, Stack, StyleProps } from '@chakra-ui/react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

type Props = {
  currentPage: number
  totalPages: number
  offset?: number
  onChangePage: (page: number) => void
}

export default function Paginator({
  currentPage,
  onChangePage,
  totalPages,
  offset = 3
}: Props) {
  const selectedStyle: StyleProps = {
    color: 'initial.white',
    bgColor: 'primary.dark'
  }

  const defaultStyle: StyleProps = {
    color: 'initial.black',
    bgColor: 'initial.white',
    borderColor: 'initial.black',
    borderWidth: '1px'
  }

  const goBack = (
    <IconButton
      key={'back'}
      size="sm"
      aria-label="back page"
      {...defaultStyle}
      isDisabled={currentPage <= 1}
      onClick={() => onChangePage(currentPage - 1)}
      icon={<Icon as={AiOutlineLeft} />}
    />
  )

  const goForward = (
    <IconButton
      key={'forward'}
      size="sm"
      aria-label="back page"
      {...defaultStyle}
      isDisabled={currentPage >= totalPages}
      onClick={() => onChangePage(currentPage + 1)}
      icon={<Icon as={AiOutlineRight} />}
    />
  )

  const toRender = [goBack]

  const isOffsetEven = offset % 2 === 0
  const halfLeftOffset = Math.floor((offset - 1) / 2)
  const halfRight = isOffsetEven
    ? Math.ceil((offset - 1) / 2)
    : Math.floor((offset - 1) / 2)

  const firstIndex = Math.max(1, currentPage - halfLeftOffset)
  const lastIndex = Math.min(currentPage + halfRight, totalPages)

  for (let i = firstIndex; i <= lastIndex; i++) {
    const style = i === currentPage ? selectedStyle : defaultStyle

    toRender.push(
      <Button key={i} size="sm" {...style} onClick={() => onChangePage(i)}>
        {i}
      </Button>
    )
  }

  toRender.push(goForward)

  return (
    <Stack direction="row" spacing="4px">
      {toRender}
    </Stack>
  )
}
