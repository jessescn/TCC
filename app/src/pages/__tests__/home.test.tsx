import { render, screen } from 'jest/utils/test-utils'

import Home from '../home'

describe('Página Home', () => {
  test('deve renderizar os componentes corretamente', () => {
    render(<Home />)

    expect(
      screen.getByText('Novo Sistema de Procedimentos da Pós-Graduacão')
    ).toBeInTheDocument()
  })
})
