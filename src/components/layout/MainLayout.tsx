import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

/**
 * MainLayout Component
 * Main layout wrapper for protected routes
 */
function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 bg-gray-50 dark:bg-dark-900">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default MainLayout
