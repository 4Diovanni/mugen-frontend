/**
 * Footer Component
 * Footer with branding
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>© {currentYear} Mugen Game Platform. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
