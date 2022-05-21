import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from 'jest/utils/test-utils'

import RedirectRoute from '../auth-redirect'

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useRoutes: jest.fn(),
    useLocation: jest.fn().mockReturnValue('/home')
  }
})

describe('Wrapper de redirecionador de rotas', () => {
  const mockGetItem = (value: any) => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(value)
  }

  const Wrapper = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RedirectRoute redirectTo="/home">
                <div>Logged!</div>
              </RedirectRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    )
  }

  test('deve permitir que o componente seja renderizado caso ele não esteja logado', () => {
    mockGetItem(null)

    render(<Wrapper />)

    expect(screen.getByText('Logged!')).toBeTruthy()
  })

  test('não deve renderizar o children e redirecionar para /home caso já esteja logado', () => {
    mockGetItem('user stored')

    render(<Wrapper />)

    expect(screen.queryByText('Logged!')).toBeFalsy()
  })
})
