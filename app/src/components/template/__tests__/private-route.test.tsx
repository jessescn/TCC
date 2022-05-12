import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '../../../jest/utils/test-util'

import PrivateRoute from '../private-route'

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useRoutes: jest.fn(),
    useLocation: jest.fn().mockReturnValue('/home')
  }
})

describe('Wrapper de rotas privadas', () => {
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
              <PrivateRoute>
                <div>Logged!</div>
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    )
  }

  test('deve permitir que o componente seja renderizado caso ele esteja logado', () => {
    mockGetItem('user stored')

    render(<Wrapper />)

    expect(screen.getByText('Logged!')).toBeTruthy()
  })

  test('não deve renderizar o children e redirecionar para /login', () => {
    mockGetItem(null)

    render(<Wrapper />)

    expect(screen.queryByText('Logged!')).toBeFalsy()
  })
})
