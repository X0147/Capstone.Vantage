export interface FlightSegment {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  aircraft: string;
}

export interface FlightOption {
  id: string;
  outbound: FlightSegment[];
  returnLeg?: FlightSegment[];
  price: number;
  cabinClass: 'economy' | 'premium' | 'business' | 'first';
  amenities: {
    wifi: boolean;
    power: boolean;
    seatPitch: string;
    baggage: string;
  };
}

export interface FilterState {
  maxPrice: number;
  stops: number[];
  airlines: string[];
}
