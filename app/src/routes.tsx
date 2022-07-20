import { Route, Routes as RoutesWrapper } from 'react-router-dom'
import AuthRedirect from './components/template/auth-redirect'
import PrivateRoute from './components/template/private-route'

import DetalhesProcesso from 'pages/processos/detalhes-processo'
import MeusProcessos from 'pages/processos/meus-processos'
import ListaTipoProcessos from 'pages/tipo-processos/lista-tipo-processos'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ListaFormularios from './pages/formularios/lista-formularios'
import DetalhesFormulario from './pages/formularios/detalhes-formulario'

import DetalhesTipoProcesso from 'pages/tipo-processos/detalhes-tipo-processo'
import PreencherProcesso from 'pages/processos/preencher-processo'

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
            <ListaFormularios />
          </PrivateRoute>
        }
      />
      <Route
        path="/formularios/edit"
        element={
          <PrivateRoute>
            <DetalhesFormulario />
          </PrivateRoute>
        }
      />
      <Route
        path="/tipo-processos"
        element={
          <PrivateRoute>
            <ListaTipoProcessos />
          </PrivateRoute>
        }
      />
      <Route
        path="/tipo-processos/edit"
        element={
          <PrivateRoute>
            <DetalhesTipoProcesso />
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
