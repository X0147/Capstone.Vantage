import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { setPayment, completePayment, selectedOutbound } = useBookingStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    card: '',
    exp: '',
    cvv: '',
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPayment(formData);

    try {
      completePayment();
      toast.success(t('payment.success') ?? 'Payment complete!');
      navigate('/confirmation');
    } catch {
      toast.error(t('payment.failed') ?? 'Payment failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const totalAmount = selectedOutbound?.price ?? 0;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-brand-light">{t('payment.details')}</h2>

        <div className="mb-6 p-4 bg-brand-dark/50 rounded-lg border border-brand-accent/30 flex justify-between">
          <span>{t('payment.totalAmount')}</span>
          <span className="font-bold text-xl text-brand-emerald">
            ${totalAmount}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nameOnCard" className="block text-sm mb-1">{t('payment.nameOnCard')}</label>
            <input
              id="nameOnCard"
              required
              type="text"
              className="w-full bg-brand-dark/50 border border-white/20 rounded p-3 text-white"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="cardNumber" className="block text-sm mb-1">{t('payment.cardNumber')}</label>
            <input
              id="cardNumber"
              required
              type="text"
              maxLength={16}
              className="w-full bg-brand-dark/50 border border-white/20 rounded p-3 text-white"
              value={formData.card}
              onChange={(e) => {
                setFormData({ ...formData, card: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-sm mb-1">{t('payment.expiry')}</label>
              <input
                id="expiry"
                required
                type="text"
                maxLength={5}
                className="w-full bg-brand-dark/50 border border-white/20 rounded p-3 text-white"
                value={formData.exp}
                onChange={(e) => {
                  setFormData({ ...formData, exp: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm mb-1">{t('payment.cvv')}</label>
              <input
                id="cvv"
                required
                type="password"
                maxLength={4}
                className="w-full bg-brand-dark/50 border border-white/20 rounded p-3 text-white"
                value={formData.cvv}
                onChange={(e) => {
                  setFormData({ ...formData, cvv: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-brand-accent hover:bg-brand-accent/80 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center w-full"
            >
              {isProcessing
                ? t('payment.processing')
                : t('payment.pay', { amount: selectedOutbound?.price ?? 0 })}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
