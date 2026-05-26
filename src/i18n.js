import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
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
