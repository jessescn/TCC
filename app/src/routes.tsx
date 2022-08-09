import { Route, Routes as RoutesWrapper } from 'react-router-dom'
import AuthRedirect from './components/template/auth-redirect'
import PrivateRoute from './components/template/private-route'

import DetalhesProcedimento from 'pages/procedimentos/detalhes-procedimento'
import MeusProcedimentos from 'pages/procedimentos/meus-procedimentos'
import ListaTipoProcedimentos from 'pages/tipo-procedimentos/tipo-procedimentos'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ListaFormularios from './pages/formularios/lista-formularios'
import DetalhesFormulario from './pages/formularios/detalhes-formulario'

import DetalhesTipoProcedimentos from 'pages/tipo-procedimentos/detalhes-tipo-procedimento'
import NovoProcedimento from 'pages/procedimentos/novo-procedimento'
import HomologarProcedimento from 'pages/colegiado/homologar-procedimento'
import ListaHomologacao from 'pages/colegiado/lista-homologacao'
import ProcedimentosCoordenacao from 'pages/coordenador/procedimentos'
import EstatisticasProcedimento from 'pages/coordenador/estatisticas'
import AnaliseProcedimento from 'pages/coordenador/analise-procedimento'

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
          <PrivateRoute requiredRoles={['admin']}>
            <ListaFormularios />
          </PrivateRoute>
        }
      />
      <Route
        path="/formularios/edit"
        element={
          <PrivateRoute requiredRoles={['admin']}>
            <DetalhesFormulario />
          </PrivateRoute>
        }
      />
      <Route
        path="/tipo-procedimentos"
        element={
          <PrivateRoute requiredRoles={['admin']}>
            <ListaTipoProcedimentos />
          </PrivateRoute>
        }
      />
      <Route
        path="/tipo-procedimentos/edit"
        element={
          <PrivateRoute requiredRoles={['admin']}>
            <DetalhesTipoProcedimentos />
          </PrivateRoute>
        }
      />
      <Route
        path="/meus-procedimentos"
        element={
          <PrivateRoute>
            <MeusProcedimentos />
          </PrivateRoute>
        }
      />
      <Route
        path="/meus-procedimentos/:id"
        element={
          <PrivateRoute>
            <DetalhesProcedimento />
          </PrivateRoute>
        }
      />
      <Route
        path="/colegiado/procedimentos/:id"
        element={
          <PrivateRoute>
            <HomologarProcedimento />
          </PrivateRoute>
        }
      />
      <Route
        path="/colegiado/procedimentos"
        element={
          <PrivateRoute>
            <ListaHomologacao />
          </PrivateRoute>
        }
      />
      <Route
        path="/coordenacao/procedimentos"
        element={
          <PrivateRoute>
            <ProcedimentosCoordenacao />
          </PrivateRoute>
        }
      />
      <Route
        path="/coordenacao/procedimentos/:id"
        element={
          <PrivateRoute>
            <AnaliseProcedimento />
          </PrivateRoute>
        }
      />
      <Route
        path="/coordenacao/estatisticas"
        element={
          <PrivateRoute>
            <EstatisticasProcedimento />
          </PrivateRoute>
        }
      />
      <Route
        path="/novo-procedimento/:id"
        element={
          <PrivateRoute>
            <NovoProcedimento />
          </PrivateRoute>
        }
      />
    </RoutesWrapper>
  )
}
