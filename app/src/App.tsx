import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/template/private-route'
import AuthRedirect from './components/template/auth-redirect'

import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'

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
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App
