/**
 * Validates an email address against a standard pattern.
 * Matches: user@domain.tld
 * Rejects: missing @, missing domain, missing TLD, whitespace
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}
