import { Box, Collapse, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { SimpleErrorMessage } from 'components/atoms/simple-error-message'
import { Formulario } from 'domain/entity/formulario'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { AiFillEdit, AiOutlineFileAdd } from 'react-icons/ai'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import TemplateModal from './modal'

export default function PDFTemplate() {
  const { watch } = useFormContext()

  const template = watch('template')
  const campos = watch('campos') || []

  const modalControls = useDisclosure()
  const [showContent, setShowContent] = useState(true)

  const invalidCampos = Formulario.validateTemplate(template, campos)

  return (
    <Box my="1rem" w="100%">
      <Button
        customVariant="ghost"
        mb="0.5rem"
        p={0}
        onClick={() => setShowContent(prev => !prev)}
        _focus={{ boxShadow: 'none' }}
        leftIcon={
          <Icon as={showContent ? MdOutlineExpandLess : MdOutlineExpandMore} />
        }
      >
        Exportar PDF
      </Button>
      <Collapse in={showContent} animateOpacity>
        <Text fontSize="sm" fontWeight="normal">
          Crie/edite o pdf que será gerado ao final do procedimento utilizando
          os campos preenchidos do formulário
        </Text>
        <Button
          size="sm"
          mt="1rem"
          onClick={modalControls.onOpen}
          leftIcon={<Icon as={template ? AiFillEdit : AiOutlineFileAdd} />}
        >
          {template ? 'Editar Template Atual' : 'Cadastrar Template'}
        </Button>
        {invalidCampos.length > 0 && (
          <SimpleErrorMessage message="O template possui dados inválidos" />
        )}
      </Collapse>
      {modalControls.isOpen && <TemplateModal {...modalControls} />}
    </Box>
  )
}
