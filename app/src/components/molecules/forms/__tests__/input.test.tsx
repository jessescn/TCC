import { render, screen } from 'jest/utils/test-utils'
import FormInput, { ErrorText } from '../input'

describe('Componente FormInput', () => {
  test('deve renderizar os componentes visuais corretamente', () => {
    render(
      <FormInput
        label={{ text: 'input label' }}
        placeholder="input placeholder"
      />
    )

    expect(screen.getByText('input label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('input placeholder')).toBeInTheDocument()
  })

  test('deve renderizar os alertas de erro que a condition for true', () => {
    const errors: ErrorText[] = [
      { condition: true, text: 'alert 1' },
      { condition: false, text: 'alert 2' },
      { condition: true, text: 'alert 3' }
    ]

    render(
      <FormInput
        label={{ text: 'input label' }}
        placeholder="input placeholder"
        errors={errors}
      />
    )

    errors.forEach(error => {
      if (!error.condition) {
        expect(screen.queryByText(error.text || '')).not.toBeInTheDocument()
        return
      }

      expect(screen.getByText(error.text || '')).toBeInTheDocument()
    })
  })
})
