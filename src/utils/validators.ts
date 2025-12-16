/**
 * Validation Utilities
 */

/**
 * Validate Email
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validate Password
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 6) {
    errors.push('Senha deve ter no mínimo 6 caracteres')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter letras minúsculas')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter letras maiúsculas')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Senha deve conter números')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate Character Name
 */
export function validateCharacterName(name: string): boolean {
  return name.trim().length >= 3 && name.trim().length <= 30
}

/**
 * Validate Input is not empty
 */
export function validateNotEmpty(value: string): boolean {
  return value.trim().length > 0
}
