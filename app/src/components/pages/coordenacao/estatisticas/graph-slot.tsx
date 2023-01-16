import { Center, useDisclosure } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { useSelector } from 'store'
import EditGraphModal from './modals/edit-graph'

export default function GraphSlot() {
  const dataInfo = useSelector(state => state.analiseDados.dataInfo)
  const controls = useDisclosure()

  return (
    <>
      <Center border="1px dashed #000" w="100%" height="100%">
        <Button onClick={controls.onOpen}>Novo Gráfico</Button>
      </Center>
      {controls.isOpen && (
        <EditGraphModal position={dataInfo.length} {...controls} />
      )}
    </>
  )
}
