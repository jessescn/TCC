import { Box } from '@chakra-ui/react'
import { ItemTypes } from 'components/organisms/form-builder'
import { useDrop } from 'react-dnd'
import { Item } from './draggable'

type SlotDropProps = {
  onDrop: (index: number, item?: string) => void
  index: number
}

export const SlotDrop = ({ onDrop, index }: SlotDropProps) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.FIELD,
      drop: (item: Item) => onDrop(index, item.type),
      collect: monitor => ({
        isOver: !!monitor.isOver()
      })
    }),
    [index]
  )

  return (
    <Box
      ref={drop}
      borderStyle="dashed"
      bgColor={isOver ? 'primary.lightest' : 'initial.white'}
      borderWidth="1px"
      color="secondary.dark"
      p={4}
      w="100%"
    >
      Arraste um elemento
    </Box>
  )
}
