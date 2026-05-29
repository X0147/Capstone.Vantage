export function getAirport(code: string) {
  // Safely retrieve airport data, avoiding direct bracket access.
  // Returns undefined if the code does not exist in the AIRPORTS map.
  // AIRPORTS is imported wherever needed.
  return Object.hasOwn(AIRPORTS, code) ? AIRPORTS[code] : undefined;
}
