import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { FormularioModel } from 'domain/models/formulario'
import RenderFormulario from './render-formulario'

type Props = {
  formularios: FormularioModel[]
}

export default function Content({ formularios }: Props) {
  return (
    <Tabs variant="enclosed">
      <TabList>
        {formularios.map(formulario => (
          <Tab maxW="30%">
            <Tooltip label={formulario.nome}>
              <Text noOfLines={1}>{formulario.nome}</Text>
            </Tooltip>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {formularios.map(formulario => (
          <TabPanel>
            <RenderFormulario formulario={formulario} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
