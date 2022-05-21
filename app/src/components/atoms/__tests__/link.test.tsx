import { render, screen } from 'jest/utils/test-utils'
import { ReactNode } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Link from '../link'

describe('Componente Link', () => {
  const RouterWrapper = ({ children }: { children: ReactNode }) => {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={children} path="/" />
        </Routes>
      </BrowserRouter>
    )
  }

  test('deve renderizar o children corretamente', () => {
    render(
      <RouterWrapper>
        <Link redirectTo="">content</Link>
      </RouterWrapper>
    )

    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
