/**
 * String and Data Formatters
 */

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR').format(num)
}

/**
 * Format currency (Gold)
 */
export function formatCurrency(amount: number): string {
  return `💰 ${formatNumber(amount)}`
}

/**
 * Format experience points
 */
export function formatXP(xp: number): string {
  return `⭐ ${formatNumber(xp)}`
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * Format date and time
 */
export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number = 50): string {
  return text.length > length ? text.substring(0, length) + '...' : text
}
