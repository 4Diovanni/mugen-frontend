/**
 * Loading Component
 * Shows loading spinner
 */
function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="mb-4">
          <div className="animate-spin text-4xl">⚙️</div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
      </div>
    </div>
  )
}

export default Loading
