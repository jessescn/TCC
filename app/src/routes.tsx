import { Route, Routes as RoutesWrapper } from 'react-router-dom'
import AuthRedirect from './components/template/auth-redirect'
import PrivateRoute from './components/template/private-route'

import DetalhesProcedimento from 'pages/meus-procedimentos/detalhes'
import MeusProcedimentos from 'pages/meus-procedimentos/lista'
import ListaTipoProcedimentos from 'pages/tipo-procedimentos/lista'
import DetalhesFormulario from './pages/formularios/detalhes'
import ListaFormularios from './pages/formularios/lista'
import Home from './pages/home'
import Login from './pages/session/login'
import Register from './pages/session/register'

import { PermissionScope } from 'domain/entity/actor'
import NotFound from 'pages/404'
import HomologarProcedimento from 'pages/colegiado/homologacao-detalhes'
import ListaHomologacao from 'pages/colegiado/homologacao-lista'
import AnaliseProcedimento from 'pages/coordenacao/analise-procedimento'
import EstatisticasProcedimento from 'pages/coordenacao/estatisticas'
import ProcedimentosCoordenacao from 'pages/coordenacao/todos-procedimentos'
import NovoProcedimento from 'pages/novo-procedimento'
import AlteracaoSenha from 'pages/session/alteracao-senha'
import AlteracaoSenhaCodigo from 'pages/session/alteracao-senha-code'
import ConfirmacaoEmail from 'pages/session/confirmacao-email'
import ConfirmacaoEmailCodigo from 'pages/session/confirmacao-email-code'
import DetalhesTipoProcedimentos from 'pages/tipo-procedimentos/detalhes'
import DetalhesUsuario from 'pages/usuarios/detalhes'
import TodosUsuarios from 'pages/usuarios/lista'

type RouteProps = {
  path: string
  redirectTo?: string
  component: JSX.Element
  permissions?: PermissionScope[]
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
    permissions: [{ name: 'formulario_read', scope: 'all' }]
  },
  {
    path: '/formularios/edit',
    component: <DetalhesFormulario />,
    isPrivate: true,
    permissions: [{ name: 'formulario_update', scope: 'all' }]
  },
  {
    path: '/tipo-procedimentos',
    component: <ListaTipoProcedimentos />,
    isPrivate: true,
    permissions: [{ name: 'tipo_procedimento_read', scope: 'all' }]
  },
  {
    path: '/tipo-procedimentos/edit',
    component: <DetalhesTipoProcedimentos />,
    isPrivate: true,
    permissions: [{ name: 'tipo_procedimento_update', scope: 'all' }]
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
    permissions: [{ name: 'colegiado_read', scope: 'all' }],
    isPrivate: true
  },
  {
    path: '/colegiado/procedimentos/:id',
    component: <HomologarProcedimento />,
    permissions: [{ name: 'colegiado_read', scope: 'all' }],
    isPrivate: true
  },
  {
    path: '/coordenacao/procedimentos',
    component: <ProcedimentosCoordenacao />,
    permissions: [{ name: 'procedimento_read', scope: 'all' }],
    isPrivate: true
  },
  {
    path: '/coordenacao/procedimentos/:id',
    component: <AnaliseProcedimento />,
    permissions: [{ name: 'procedimento_read', scope: 'all' }],
    isPrivate: true
  },
  {
    path: '/coordenacao/usuarios',
    component: <TodosUsuarios />,
    permissions: [{ name: 'actor_create', scope: 'all' }],
    isPrivate: true
  },
  {
    path: '/coordenacao/usuarios/edit',
    component: <DetalhesUsuario />,
    permissions: [
      { name: 'actor_create', scope: 'all' },
      { name: 'actor_update', scope: 'all' }
    ],
    isPrivate: true
  },
  {
    path: '/coordenacao/estatisticas',
    component: <EstatisticasProcedimento />,
    permissions: [{ name: 'analise_data_read', scope: 'all' }],
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
        <PrivateRoute permissions={route.permissions}>
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
