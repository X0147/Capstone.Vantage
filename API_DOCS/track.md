# Track Ticket API

This document describes the mock tracking API service used in Capstone.Vantage. The service allows users to look up their flight itinerary and tracking information securely.

## Endpoint

`trackTicket(request: TrackingRequest): Promise<TicketDetails | null>`

## Request Schema

The request payload is strictly validated using Zod schemas on the client-side before submission.

```typescript
{
  pnr: string;       // Booking reference (PNR), min 5 to max 10 chars.
  lastName: string;  // Passenger's last name, min 2 chars.
  email: string;     // Valid email address used for booking.
}
```

## Response Schema (TicketDetails)

If the credentials match an active reservation, the service returns a `TicketDetails` object:

```typescript
{
  pnr: string;
  lastName: string;
  flightNumber: string;
  origin: string;       // Origin IATA code
  destination: string;  // Destination IATA code
  departureTime: string; // ISO 8601 date string
  arrivalTime: string;   // ISO 8601 date string
  status: string;        // e.g., 'ON_TIME', 'DELAYED'
  seat: string;
  passengerName: string;
  passengerFirstName: string;
  passengerLastName: string;
  cabin: string;
  gate: string;
  terminal: string;
}
```

## Error Handling

If no active reservation matches the provided credentials, the service will throw an Error:
`Error: 'No active reservation found matching those credentials.'`
