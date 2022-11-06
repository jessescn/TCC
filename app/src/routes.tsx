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
import NotFound from 'pages/404'

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
          <PrivateRoute allowedProfiles={['coordenacao']}>
            <ListaFormularios />
          </PrivateRoute>
        }
      />
      <Route
        path="/formularios/edit"
        element={
          <PrivateRoute allowedProfiles={['coordenacao']}>
            <DetalhesFormulario />
          </PrivateRoute>
        }
      />
      <Route
        path="/tipo-procedimentos"
        element={
          <PrivateRoute allowedProfiles={['coordenacao']}>
            <ListaTipoProcedimentos />
          </PrivateRoute>
        }
      />
      <Route
        path="/tipo-procedimentos/edit"
        element={
          <PrivateRoute allowedProfiles={['coordenacao']}>
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
          <PrivateRoute allowedProfiles={['coordenacao', 'colegiado']}>
            <HomologarProcedimento />
          </PrivateRoute>
        }
      />
      <Route
        path="/colegiado/procedimentos"
        element={
          <PrivateRoute allowedProfiles={['coordenacao', 'colegiado']}>
            <ListaHomologacao />
          </PrivateRoute>
        }
      />
      <Route
        path="/coordenacao/procedimentos"
        element={
          <PrivateRoute allowedProfiles={['coordenacao']}>
            <ProcedimentosCoordenacao />
          </PrivateRoute>
        }
      />
      <Route
        path="/coordenacao/procedimentos/:id"
        element={
          <PrivateRoute allowedProfiles={['coordenacao']}>
            <AnaliseProcedimento />
          </PrivateRoute>
        }
      />
      <Route
        path="/coordenacao/estatisticas"
        element={
          <PrivateRoute allowedProfiles={['coordenacao']}>
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
      <Route path="*" element={<NotFound />} />
    </RoutesWrapper>
  )
}
