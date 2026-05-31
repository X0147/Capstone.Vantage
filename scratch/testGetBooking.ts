import { useBookingStore } from '../src/store/useBookingStore';

const result = useBookingStore.getState().getBooking('OFDTIF69RBJJZIJ1OSMR', 'Newton');
console.log('Result:', JSON.stringify(result, null, 2));
