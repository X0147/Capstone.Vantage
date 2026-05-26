import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app": {
        "title": "CapstoneFlight"
      },
      "search": {
        "heading": "Where are you flying?",
        "from": "From",
        "to": "To",
        "depart": "Depart",
        "return": "Return",
        "searching": "Searching...",
        "searchFlights": "Search Flights"
      },
      "results": {
        "heading": "Select your flight: ",
        "continue": "Continue to Passengers"
      },
      "passenger": {
        "heading": "Passenger Information",
        "firstName": "First Name",
        "lastName": "Last Name",
        "email": "Email",
        "phone": "Phone Number",
        "continue": "Continue to Seat Selection"
      },
      "seat": {
        "heading": "Select your seat",
        "continue": "Continue to Payment"
      },
      "confirmation": {
        "noBooking": "No booking found. ",
        "returnHome": "Return Home",
        "boardingPass": "Boarding Pass",
        "reference": "Booking Reference",
        "passenger": "Passenger",
        "flight": "Flight",
        "seat": "Seat",
        "print": "Print Receipt",
        "done": "Done"
      },
      "payment": {
        "details": "Payment Details",
        "totalAmount": "Total Amount",
        "nameOnCard": "Name on Card",
        "cardNumber": "Card Number",
        "expiry": "Expiry (MM/YY)",
        "cvv": "CVV",
        "processing": "Processing...",
        "pay": "Pay ${{amount}}",
        "success": "Payment successful!",
        "failed": "Payment failed. Please try again."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
