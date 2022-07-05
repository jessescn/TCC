import { Route, Routes } from 'react-router-dom'
import AuthRedirect from './components/template/auth-redirect'
import PrivateRoute from './components/template/private-route'

import Forms from 'pages/forms'
import Form from 'pages/forms/form'
import MeusProcessos from 'pages/meus-processos'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import DetalhesProcesso from 'pages/detalhes-processo'

function App() {
  return (
    <Routes>
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
            <Forms />
          </PrivateRoute>
        }
      />
      <Route
        path="/formularios/edit"
        element={
          <PrivateRoute>
            <Form />
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
    </Routes>
  )
}

export default App
