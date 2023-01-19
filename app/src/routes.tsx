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
import { ProfileType } from 'domain/models/user'

type RouteProps = {
  path: string
  redirectTo?: string
  component: JSX.Element
  allowedProfiles?: ProfileType[]
  isPrivate?: boolean
}

export const routes: RouteProps[] = [
  {
    path: '/login',
    component: <Login />,
    redirectTo: '/home'
  },
  {
    path: '/cadastro',
    component: <Register />,
    redirectTo: '/home'
  },
  {
    path: '/alteracao-senha',
    component: <AlteracaoSenha />
  },
  {
    path: '/alteracao-senha/:code',
    component: <AlteracaoSenhaCodigo />
  },
  {
    path: '/confirmacao-email',
    component: <ConfirmacaoEmail />,
    redirectTo: '/home'
  },
  {
    path: '/confirmacao-email/:code',
    component: <ConfirmacaoEmailCodigo />
  },
  {
    path: '/',
    component: <Home />,
    isPrivate: true
  },
  {
    path: '/home',
    component: <Home />,
    isPrivate: true
  },
  {
    path: '/formularios',
    component: <ListaFormularios />,
    isPrivate: true,
    allowedProfiles: ['coordenacao']
  },
  {
    path: '/formularios/edit',
    component: <DetalhesFormulario />,
    isPrivate: true,
    allowedProfiles: ['coordenacao']
  },
  {
    path: '/tipo-procedimentos',
    component: <ListaTipoProcedimentos />,
    isPrivate: true,
    allowedProfiles: ['coordenacao']
  },
  {
    path: '/tipo-procedimentos/edit',
    component: <DetalhesTipoProcedimentos />,
    isPrivate: true,
    allowedProfiles: ['coordenacao']
  },
  {
    path: '/meus-procedimentos',
    component: <MeusProcedimentos />,
    isPrivate: true
  },
  {
    path: '/meus-procedimentos/:id',
    component: <DetalhesProcedimento />,
    isPrivate: true
  },
  {
    path: '/colegiado/procedimentos',
    component: <ListaHomologacao />,
    allowedProfiles: ['coordenacao', 'colegiado', 'secretaria'],
    isPrivate: true
  },
  {
    path: '/colegiado/procedimentos/:id',
    component: <HomologarProcedimento />,
    allowedProfiles: ['coordenacao', 'colegiado', 'secretaria'],
    isPrivate: true
  },
  {
    path: '/coordenacao/procedimentos',
    component: <ProcedimentosCoordenacao />,
    allowedProfiles: ['coordenacao'],
    isPrivate: true
  },
  {
    path: '/coordenacao/procedimentos/:id',
    component: <AnaliseProcedimento />,
    allowedProfiles: ['coordenacao'],
    isPrivate: true
  },
  {
    path: '/coordenacao/usuarios',
    component: <TodosUsuarios />,
    allowedProfiles: ['coordenacao'],
    isPrivate: true
  },
  {
    path: '/coordenacao/usuarios/edit',
    component: <DetalhesUsuario />,
    allowedProfiles: ['coordenacao'],
    isPrivate: true
  },
  {
    path: '/coordenacao/estatisticas',
    component: <EstatisticasProcedimento />,
    allowedProfiles: ['coordenacao'],
    isPrivate: true
  },
  {
    path: '/novo-procedimento/:id',
    component: <NovoProcedimento />,
    isPrivate: true
  },
  {
    path: '*',
    component: <NotFound />
  }
]

export default function Routes() {
  function getRouterElement(route: RouteProps) {
    if (route.isPrivate) {
      return (
        <PrivateRoute allowedProfiles={route.allowedProfiles}>
          {route.component}
        </PrivateRoute>
      )
    }

    if (route.redirectTo) {
      return (
        <AuthRedirect redirectTo={route.redirectTo}>
          {route.component}
        </AuthRedirect>
      )
    }

    return route.component
  }

  return (
    <RoutesWrapper>
      {routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={getRouterElement(route)}
        />
      ))}
    </RoutesWrapper>
  )
}
