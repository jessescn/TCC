import { render, screen } from 'jest/utils/test-utils'
import Screen from '../screen'

describe('Componente Screen', () => {
  test('deve renderizar o children corretamente', () => {
    render(<Screen>content</Screen>)

    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
