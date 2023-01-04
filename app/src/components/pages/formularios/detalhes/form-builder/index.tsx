import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react'
import Campo, {
  CampoFormulario
} from 'components/molecules/forms/build-fields/campo'
import lodash from 'lodash'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { RiErrorWarningLine } from 'react-icons/ri'
import SideMenu from './side-menu'
import Preview from '../preview'

type Props = {
  onDuplicate: () => void
}

export default function FormBuilder({ onDuplicate }: Props) {
  const { setValue, watch } = useFormContext()

  const campos: CampoFormulario[] = watch('campos') || []
  const [showContent, setShowContent] = useState(true)

  const handleDuplicate = useCallback(
    (campoOrdem: number) => {
      const index = campos.findIndex(campo => campo.ordem === campoOrdem)

      if (index === -1) return

      const ordem = new Date().valueOf()
      const campoCopy: CampoFormulario = lodash.cloneDeep({
        ...campos[index],
        ordem
      })

      const updatedCampos: CampoFormulario[] = lodash.cloneDeep([...campos])

      updatedCampos.splice(index, 0, campoCopy)

      setValue('campos', updatedCampos)
    },
    [campos, setValue]
  )

  const handleDelete = useCallback(
    (ordem: number) => {
      setValue(
        'campos',
        campos.filter(campo => campo.ordem !== ordem)
      )
    },
    [campos, setValue]
  )

  const handleUpdate = (campo: CampoFormulario) => {
    const camposCopy = [...campos]

    const idx = camposCopy.findIndex(el => el.ordem === campo.ordem)

    if (idx === -1) {
      return
    }

    camposCopy.splice(idx, 1, campo)

    setValue('campos', camposCopy)
  }

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    const camposCopy: CampoFormulario[] = JSON.parse(JSON.stringify(campos))

    const campo = camposCopy[dragIndex]
    camposCopy.splice(dragIndex, 1)
    camposCopy.splice(hoverIndex, 0, campo)

    setValue('campos', camposCopy)
  }

  return (
    <>
      <Button
        variant="unstyled"
        px={0}
        mb="0.5rem"
        mt="1.5rem"
        onClick={() => setShowContent(prev => !prev)}
        _focus={{ boxShadow: 'none' }}
        leftIcon={
          <Icon as={showContent ? MdOutlineExpandLess : MdOutlineExpandMore} />
        }
      >
        Configuração dos Campos
        <Text fontSize="xs" fontWeight="normal">
          (Ao menos um campo é obrigatório)
        </Text>
      </Button>
      <Collapse in={showContent} animateOpacity>
        <Tabs isLazy>
          <TabList>
            <Tab>Campos</Tab>
            <Tab>Preview</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box my="1rem">
                <Flex alignItems="center" mb="1rem">
                  <Icon as={RiErrorWarningLine} mr="0.5rem" />
                  <Text fontSize="sm" fontWeight="bold">
                    Segure e arraste os campos para alterar a ordem de exibição
                  </Text>
                </Flex>
                <Stack spacing="1.5rem">
                  {campos.map((campo, idx) => (
                    <Campo
                      key={campo.ordem}
                      campo={campo}
                      onDelete={handleDelete}
                      onDuplicate={handleDuplicate}
                      onUpdate={handleUpdate}
                      onMove={handleMove}
                      index={idx}
                    />
                  ))}
                </Stack>
              </Box>
              <SideMenu onDuplicate={onDuplicate} />
            </TabPanel>
            <TabPanel>
              <Preview />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Collapse>
    </>
  )
}
