import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      search: 'Search Availability',
      departure: 'Departure Airport',
      payment: {
        details: 'Payment Details',
        totalAmount: 'Total Amount',
        nameOnCard: 'Name on Card',
        cardNumber: 'Card Number',
        expiry: 'Expiry (MM/YY)',
        cvv: 'CVV',
        processing: 'Processing...',
        pay: 'Pay ${{amount}}',
        success: 'Payment successful!',
        failed: 'Payment failed. Please try again.',
      },
    },
  },
  fr: {
    translation: {
      search: 'Rechercher la disponibilité',
      departure: 'Aéroport de départ',
    },
  },
  es: {
    translation: {
      search: 'Buscar disponibilidad',
      departure: 'Aeropuerto de salida',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
