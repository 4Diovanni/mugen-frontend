import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Pages
import Login from '@pages/auth/Login'
import Register from '@pages/auth/Register'
import ForgotPassword from '@pages/auth/ForgotPassword'
import Dashboard from '@pages/dashboard/Dashboard'
import CharacterList from '@pages/characters/CharacterList'
import CharacterDetail from '@pages/characters/CharacterDetail'
import CreateCharacter from '@pages/characters/CreateCharacter'
import AdminPanel from '@pages/admin/AdminPanel'
import NotFound from '@pages/NotFound'
import Unauthorized from '@pages/Unauthorized'

// Middleware
import ProtectedRoute from '@middleware/ProtectedRoute'

// Layout
import MainLayout from '@components/layout/MainLayout'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Characters */}
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
            <Route path="/characters/create" element={<CreateCharacter />} />

            {/* Admin - Only Master */}
            <Route path="/admin" element={<ProtectedRoute requiredRole="ROLE_MASTER"><AdminPanel /></ProtectedRoute>} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: `1px solid var(--border-color)`,
          },
        }}
      />
    </>
  )
}

export default App
