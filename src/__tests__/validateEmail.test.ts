import { validateEmail } from '../utils/validateEmail';

describe('validateEmail', () => {
  // ── Valid emails ──
  it('accepts a standard email address', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('accepts emails with subdomains', () => {
    expect(validateEmail('user@mail.example.co.uk')).toBe(true);
  });

  it('accepts emails with dots in local part', () => {
    expect(validateEmail('first.last@domain.org')).toBe(true);
  });

  it('accepts emails with plus addressing', () => {
    expect(validateEmail('user+tag@gmail.com')).toBe(true);
  });

  it('accepts emails with hyphens in domain', () => {
    expect(validateEmail('user@my-domain.com')).toBe(true);
  });

  // ── Invalid emails ──
  it('rejects empty string', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('rejects undefined-like falsy input', () => {
    // @ts-expect-error testing runtime edge case
    expect(validateEmail(undefined)).toBe(false);
    // @ts-expect-error testing runtime edge case
    expect(validateEmail(null)).toBe(false);
  });

  it('rejects string without @ symbol', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  it('rejects string without domain TLD', () => {
    expect(validateEmail('user@domain')).toBe(false);
  });

  it('rejects string with spaces', () => {
    expect(validateEmail('user @example.com')).toBe(false);
    expect(validateEmail('user@ example.com')).toBe(false);
  });

  it('rejects string with multiple @ symbols', () => {
    expect(validateEmail('user@@example.com')).toBe(false);
  });

  it('rejects string with nothing before @', () => {
    expect(validateEmail('@example.com')).toBe(false);
  });

  it('rejects string with nothing after @', () => {
    expect(validateEmail('user@')).toBe(false);
  });
});
