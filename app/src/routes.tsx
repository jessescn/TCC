import { Route, Routes as RoutesWrapper } from 'react-router-dom'
import AuthRedirect from './components/template/auth-redirect'
import PrivateRoute from './components/template/private-route'

import DetalhesProcesso from 'pages/detalhes-processo'
import MeusProcessos from 'pages/meus-processos'
import TipoProcessos from 'pages/tipo-processos'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Formularios from './pages/forms'
import Formulario from './pages/forms/form'

import TipoProcesso from 'pages/tipo-processos/tipo-processo'
import PreencherProcesso from 'pages/preencher-processo'

export default function Routes() {
  return (
    <RoutesWrapper>
      <Route
        path="/login"
        element={
          <AuthRedirect redirectTo="/home">
            <Login />
          </AuthRedirect>
        }
      />
      <Route
        path="/cadastro"
        element={
          <AuthRedirect redirectTo="/home">
            <Register />
          </AuthRedirect>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/formularios"
        element={
          <PrivateRoute>
            <Formularios />
          </PrivateRoute>
        }
      />
      <Route
        path="/formularios/edit"
        element={
          <PrivateRoute>
            <Formulario />
          </PrivateRoute>
        }
      />
      <Route
        path="/tipo-processos"
        element={
          <PrivateRoute>
            <TipoProcessos />
          </PrivateRoute>
        }
      />
      <Route
        path="/tipo-processos/edit"
        element={
          <PrivateRoute>
            <TipoProcesso />
          </PrivateRoute>
        }
      />
      <Route
        path="/meus-processos"
        element={
          <PrivateRoute>
            <MeusProcessos />
          </PrivateRoute>
        }
      />
      <Route
        path="/meus-processos/:id"
        element={
          <PrivateRoute>
            <DetalhesProcesso />
          </PrivateRoute>
        }
      />
      <Route
        path="/novo-processo/:id"
        element={
          <PrivateRoute>
            <PreencherProcesso />
          </PrivateRoute>
        }
      />
    </RoutesWrapper>
  )
}
