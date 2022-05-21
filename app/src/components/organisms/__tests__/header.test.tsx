import { render, screen, userEvent } from 'jest/utils/test-utils'
import * as store from 'store'
import Header from '../header'

describe('Componente Header', () => {
  const mockUseSelector = (data: any = {}) => {
    return jest.spyOn(store, 'useSelector').mockReturnValue(data)
  }

  beforeEach(() => {
    mockUseSelector()
  })

  test('deve renderizar os elementos visuais corretamente', () => {
    const user = { name: 'user name' }

    mockUseSelector(user)

    render(<Header />)

    const shouldRender = ['Computação UFCG', 'Logout', user.name]

    shouldRender.forEach(element => {
      expect(screen.getByText(element)).toBeInTheDocument()
    })
  })

  test('deve chamar a action de deslogar ao clicar no botão de logout', () => {
    const dispatchSpy = jest.spyOn(store.store, 'dispatch')

    render(<Header />)

    userEvent.click(screen.getByText('Logout'))

    expect(dispatchSpy).toHaveBeenCalled()
  })
})
