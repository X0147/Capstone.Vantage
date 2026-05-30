import { AIRPORTS } from '../data/airports';
import type { Airport } from '../data/airports';

/**
 * Safely look up a property on an object without prototype pollution.
 */
export function safeLookup<V>(obj: Record<string, V>, key: string): V | undefined {
  // eslint-disable-next-line security/detect-object-injection
  return Object.hasOwn(obj, key) ? obj[key] : undefined;
}

/**
 * Retrieves airport data safely by its IATA code.
 */
export function getAirport(code: string): Airport | undefined {
  return safeLookup(AIRPORTS, code);
}
