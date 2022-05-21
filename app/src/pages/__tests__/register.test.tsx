import PageWrapper from 'components/template/page-wrapper'
import {
  render,
  screen,
  waitFor,
  userEvent,
  fireEvent
} from 'jest/utils/test-utils'
import * as store from 'store'

import Register, { RegisterForm } from '../register'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  }
})

describe('Página Register', () => {
  const customRender = () => {
    render(
      <PageWrapper>
        <Register />
      </PageWrapper>
    )
  }

  test('deve renderizar os componentes corretamente', () => {
    customRender()

    const shouldRender = [
      'Cadastro',
      'Cadastrar',
      'Nome Completo',
      'Email',
      'Senha',
      'Confirmar Senha',
      'já possuo conta!'
    ]

    shouldRender.forEach(element => {
      expect(screen.getByText(element)).toBeInTheDocument()
    })

    const shouldRenderPlaceholders = [
      'Ex. João da Silva',
      'Ex. email@ccc.ufcg.edu.br',
      '******'
    ]

    shouldRenderPlaceholders.forEach(placeholder => {
      expect(
        screen.getAllByPlaceholderText(placeholder).length
      ).toBeGreaterThan(0)
    })
  })

  test('deve redirecionar para a página de login caso o status da requisição seja success', async () => {
    jest.spyOn(store, 'useSelector').mockReturnValue('success')

    customRender()

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    })
  })

  test('deve mostrar uma mensagem de erro caso o status da requisição seja failure', async () => {
    jest.spyOn(store, 'useSelector').mockReturnValue('failure')

    customRender()

    await waitFor(() => {
      expect(screen.getByText('erro ao criar novo usuário')).toBeInTheDocument()
    })
  })

  test('deve chamar a função de criar usuário ao preencher todos os campos corretamente e clicar em cadastrar', async () => {
    const createUserSpy = jest.spyOn(store.actions.user, 'create')

    customRender()

    const newUser: RegisterForm = {
      email: 'test@teste.com',
      name: 'teste name',
      password: 'pass@1234',
      confirmPassword: 'pass@1234'
    }

    userEvent.type(screen.getByLabelText('Nome Completo'), newUser.name)
    userEvent.type(screen.getByLabelText('Email'), newUser.email)
    userEvent.type(screen.getByLabelText('Senha'), newUser.password)
    userEvent.type(
      screen.getByLabelText('Confirmar Senha'),
      newUser.confirmPassword
    )

    fireEvent.submit(screen.getByTestId('register-form'))

    await waitFor(() => {
      expect(createUserSpy).toHaveBeenCalledWith(newUser)
    })
  })

  test('deve mostrar as mensagens de campo obrigatório ao clicar em cadastrar sem preencher', async () => {
    customRender()

    fireEvent.submit(screen.getByTestId('register-form'))

    await waitFor(() => {
      expect(screen.getAllByText('*campo obrigatório').length).toEqual(4)
    })
  })

  test('deve mostrar as mensagens das funções de validação de email e confirmar senha ao preencher incorretamente', async () => {
    customRender()

    const newUser: RegisterForm = {
      email: 'teste.com', // invalid email
      name: 'teste name',
      password: 'pass@1234',
      confirmPassword: 'pass@1235' // different from password
    }

    userEvent.type(screen.getByLabelText('Nome Completo'), newUser.name)
    userEvent.type(screen.getByLabelText('Email'), newUser.email)
    userEvent.type(screen.getByLabelText('Senha'), newUser.password)
    userEvent.type(
      screen.getByLabelText('Confirmar Senha'),
      newUser.confirmPassword
    )

    fireEvent.submit(screen.getByTestId('register-form'))

    await waitFor(() => {
      expect(screen.getByText('email inválido')).toBeInTheDocument()
      expect(screen.getByText('as senhas não correspondem')).toBeInTheDocument()
    })
  })
})
