import { render, screen } from 'jest/utils/test-utils'

import LogoPanel from '../logo-panel'

describe('Componente LogoPanel', () => {
  test('deve renderizar o título corretamente', () => {
    render(<LogoPanel side="left" />)

    expect(
      screen.getByText('Sistema de Pós-Graduação UFCG')
    ).toBeInTheDocument()
  })

  test('deve carregar a imagem logo da ufcg corretamente', () => {
    render(<LogoPanel side="right" />)

    const image = screen.getByAltText('ufcg logo image')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', './logo_ufcg.png')
  })
})
