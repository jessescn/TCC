import { Input } from '@chakra-ui/react'
import { render, screen } from 'jest/utils/test-utils'
import FormControl from '../control'

describe('Componente FormControl', () => {
  test('deve renderizar os componentes corretamente', () => {
    render(
      <FormControl label="input label">
        <Input placeholder="input placeholder" />
      </FormControl>
    )

    expect(screen.getByText('input label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('input placeholder')).toBeInTheDocument()
  })

  test('deve marcar a label como inválido caso isInvalid seja true', () => {
    render(
      <FormControl label="input label" isInvalid>
        <Input placeholder="input placeholder" />
      </FormControl>
    )

    expect(screen.getByText('input label')).toHaveAttribute('data-invalid')
  })
})
