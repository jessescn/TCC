import { Route, Routes as RoutesWrapper } from 'react-router-dom'
import AuthRedirect from './components/template/auth-redirect'
import PrivateRoute from './components/template/private-route'

import DetalhesProcedimento from 'pages/meus-procedimentos/detalhes'
import MeusProcedimentos from 'pages/meus-procedimentos/lista'
import ListaTipoProcedimentos from 'pages/tipo-procedimentos/lista'
import Home from './pages/home'
import Login from './pages/session/login'
import Register from './pages/session/register'
import ListaFormularios from './pages/formularios/lista'
import DetalhesFormulario from './pages/formularios/detalhes'

import DetalhesTipoProcedimentos from 'pages/tipo-procedimentos/detalhes'
import NovoProcedimento from 'pages/novo-procedimento'
import HomologarProcedimento from 'pages/colegiado/homologacao-detalhes'
import ListaHomologacao from 'pages/colegiado/homologacao-lista'
import ProcedimentosCoordenacao from 'pages/coordenacao/todos-procedimentos'
import EstatisticasProcedimento from 'pages/coordenacao/estatisticas'
import AnaliseProcedimento from 'pages/coordenacao/analise-procedimento'
import NotFound from 'pages/404'
import TodosUsuarios from 'pages/usuarios/lista'
import DetalhesUsuario from 'pages/usuarios/detalhes'
import ConfirmacaoEmail from 'pages/session/confirmacao-email'
import ConfirmacaoEmailCodigo from 'pages/session/confirmacao-email-code'
import AlteracaoSenha from 'pages/session/alteracao-senha'
import AlteracaoSenhaCodigo from 'pages/session/alteracao-senha-code'

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
      <Route path="/alteracao-senha" element={<AlteracaoSenha />} />
      <Route path="/alteracao-senha/:code" element={<AlteracaoSenhaCodigo />} />
      <Route
        path="/confirmacao-email/:code"
        element={<ConfirmacaoEmailCodigo />}
      />
      <Route
        path="/confirmacao-email"
        element={
          <AuthRedirect redirectTo="/home">
            <ConfirmacaoEmail />
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
        path="/home"
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
        path="/coordenacao/usuarios"
        element={
          <PrivateRoute allowedProfiles={['coordenacao']}>
            <TodosUsuarios />
          </PrivateRoute>
        }
      />
      <Route
        path="/coordenacao/usuarios/edit"
        element={
          <PrivateRoute allowedProfiles={['coordenacao']}>
            <DetalhesUsuario />
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
