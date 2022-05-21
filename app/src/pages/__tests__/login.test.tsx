import PageWrapper from 'components/template/page-wrapper'
import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor
} from 'jest/utils/test-utils'
import * as store from 'store'
import Login from '../login'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  }
})

describe('Página Login', () => {
  const customRender = () => {
    render(
      <PageWrapper>
        <Login />
      </PageWrapper>
    )
  }

  beforeAll(() => {
    jest.spyOn(store, 'useSelector').mockReturnValue('pristine')
  })

  test('deve renderizar os componentes corretamente', () => {
    customRender()

    const shouldRender = [
      'Você não está conectado ao sistema. Utilize o formulário abaixo para se autenticar',
      'Email',
      'Senha',
      'Acessar',
      'Não possui acesso? clique aqui!'
    ]

    shouldRender.forEach(element => {
      expect(screen.getByText(element)).toBeInTheDocument()
    })
  })

  test('deve redirecionar para /home caso o loginStatus seja success', async () => {
    jest.spyOn(store, 'useSelector').mockReturnValue('success')

    customRender()

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home')
    })
  })

  test('deve chamar a função de login ao preencher os campos e clicar em acessar', async () => {
    const loginSpy = jest.spyOn(store.actions.session, 'login')

    customRender()

    const loginForm = {
      email: 'teste@teste.com',
      password: 'pass@1234'
    }

    userEvent.type(screen.getByLabelText('Email'), 'teste@teste.com')
    userEvent.type(screen.getByLabelText('Senha'), 'pass@1234')

    fireEvent.submit(screen.getByTestId('login-form'))

    await waitFor(() => {
      expect(loginSpy).toHaveBeenCalledWith(loginForm)
    })
  })

  test('deve mostrar as mensagens de campo obrigatório caso os campos não sejam preenchidos', async () => {
    customRender()

    fireEvent.submit(screen.getByTestId('login-form'))

    await waitFor(() => {
      expect(screen.getByText('*email obrigatório')).toBeInTheDocument()
      expect(screen.getByText('*senha obrigatória')).toBeInTheDocument()
    })
  })

  test('deve mostrar uma mensagem de credenciais inválidas os dados sejam incorretos', async () => {
    jest.spyOn(store, 'useSelector').mockReturnValue('failure')

    customRender()

    expect(screen.getByText('credenciais inválidas!')).toBeInTheDocument()
  })
})
