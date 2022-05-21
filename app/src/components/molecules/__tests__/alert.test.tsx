import { Text } from '@chakra-ui/react'
import { render, screen } from 'jest/utils/test-utils'
import Alert from '../alert'

describe('Componente Alert', () => {
  test('deve renderizar corretamente', () => {
    render(
      <Alert title="alert title">
        <Text>alert message</Text>
      </Alert>
    )

    expect(screen.getByText('alert message')).toBeInTheDocument()
    expect(screen.getByText('alert title')).toBeInTheDocument()
  })

  test('não deve renderizar o container de titulo caso ele não seja passado como props', () => {
    render(
      <Alert>
        <Text>alert message</Text>
      </Alert>
    )

    expect(screen.getByText('alert message')).toBeInTheDocument()
    expect(
      screen.queryByTestId('alert-title-container')
    ).not.toBeInTheDocument()
  })
})
