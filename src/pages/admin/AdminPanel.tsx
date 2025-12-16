/**
 * Admin Panel Page
 * Only accessible by ROLE_MASTER
 */
function AdminPanel() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        ⚙️ Painel de Administração
      </h1>
      {/* TODO: Implement admin features */}
      <p className="text-gray-600 dark:text-gray-400">
        Página de administração do sistema
      </p>
    </div>
  )
}

export default AdminPanel
