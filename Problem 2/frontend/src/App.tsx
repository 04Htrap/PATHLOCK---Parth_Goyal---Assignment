import { Routes, Route, Navigate, Link } from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import Dashboard from './pages/Dashboard'
import ProjectDetails from './pages/ProjectDetails'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './state/AuthContext'

export default function App() {
  const { user, logout } = useAuth()
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Link to={user ? '/projects' : '/'}>Mini Project Manager</Link>
        {user && (
          <div>
            <span style={{ marginRight: 12 }}>Hi {user}</span>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </header>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route element={<ProtectedRoute />}> 
          <Route path="/projects" element={<Dashboard />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Route>
        <Route path="*" element={<Navigate to={user ? '/projects' : '/'} replace />} />
      </Routes>
    </div>
  )
}




