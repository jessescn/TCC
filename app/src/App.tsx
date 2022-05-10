import { Route, Routes } from 'react-router-dom'

import Login from './pages/login'
import Register from './pages/register'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/home" />
    </Routes>
  )
}

export default App
