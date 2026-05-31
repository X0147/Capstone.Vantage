// src/data/flightMocks.ts
/**
 * Premium data model for a multi‑leg long‑haul journey.
 * This payload is consumed by UI components such as the boarding‑pass page.
 */
export type Airport = {
  /** IATA code */
  iata: string;
  /** Full airport name */
  name: string;
  /** City / Country */
  location: string;
  /** Terminal (optional) */
  terminal?: string;
};

export type Leg = {
  /** Airline carrier code, e.g., 'TK' */
  carrier: string;
  /** Flight number (numeric part) */
  flightNumber: string;
  /** Aircraft type */
  aircraft: string;
  /** Departure airport */
  departure: Airport;
  /** Arrival airport */
  arrival: Airport;
  /** Scheduled departure ISO timestamp */
  departureTime: string;
  /** Scheduled arrival ISO timestamp */
  arrivalTime: string;
  /** Cabin class for this leg */
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  /** Seat allocation (optional) */
  seat?: string;
  /** Stop‑over specific data – only present on layover legs */
  stopover?: {
    /** Minimum connection time in minutes */
    minConnectionMins: number;
    /** Does this connection require a visa? */
    visaRequired: boolean;
    /** Custom passenger‑facing warning */
    notice?: string;
  };
};

export type MultiLegJourney = {
  passengerName: string;
  contactEmail: string;
  trackingCode: string;
  pnr: string;
  /** Overall check‑in status */
  checkInStatus: 'OK' | 'CHECKED IN';
  legs: Leg[];
};

/** Example payload – the exact data you asked for */
export const mockJourney: MultiLegJourney = {
  passengerName: 'Jennifer Natalie Newton',
  contactEmail: 'newtonjenny07@gmail.com',
  trackingCode: 'AX7890zklmnpqrt',
  pnr: 'OFDTIF69RBJJZIJ1OSMR',
  checkInStatus: 'CHECKED IN',
  legs: [
    {
      carrier: 'TK',
      flightNumber: '1972',
      aircraft: 'Airbus A350-1000',
      departure: {
        iata: 'JIB',
        name: 'Ambouli International Airport',
        location: 'Djibouti',
        terminal: 'T1',
      },
      arrival: {
        iata: 'IST',
        name: 'Istanbul Airport',
        location: 'Istanbul, Turkey',
        terminal: 'T2',
      },
      departureTime: '2026-06-01T23:55:00+03:00',
      arrivalTime:   '2026-06-02T06:30:00+03:00',
      cabinClass: 'Business',
      seat: '12A',
      stopover: {
        minConnectionMins: 70,
        visaRequired: true,
        notice: 'Transit visa required for Turkey',
      },
    },
    {
      carrier: 'TK',
      flightNumber: '1918',
      aircraft: 'Airbus A350-1000',
      departure: {
        iata: 'IST',
        name: 'Istanbul Airport',
        location: 'Istanbul, Turkey',
        terminal: 'T2',
      },
      arrival: {
        iata: 'ORD',
        name: "Chicago O'Hare International Airport",
        location: 'Chicago, USA',
        terminal: 'T1',
      },
      departureTime: '2026-06-02T07:40:00+03:00',
      arrivalTime:   '2026-06-03T09:40:00-05:00',
      cabinClass: 'Business',
      seat: '10C',
    },
  ],
};
