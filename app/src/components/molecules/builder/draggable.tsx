import { Box } from '@chakra-ui/react'
import { ItemTypes } from 'components/organisms/form-builder'
import { ReactNode } from 'react'
import { useDrag } from 'react-dnd'

export type Item = {
  type: string
}

type DraggableProps = {
  children: ReactNode
  item: Item
}

export const Draggable = ({ children, item }: DraggableProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FIELD,
    item,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <Box ref={drag} opacity={isDragging ? 0.5 : 1} cursor="move">
      {children}
    </Box>
  )
}
