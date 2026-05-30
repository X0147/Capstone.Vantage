import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore, Passenger as PassengerDetails } from '../store/useBookingStore';
import SeatSelector from '../features/seat/SeatSelector';
import { CheckCircle2, User, Landmark, ShieldCheck, PlaneTakeoff } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    currentStep,
    passenger,
    selectedSeats,
    seatPriceTotal,
    setPassenger,
    setSeats,
    completePayment,
    selectedOutbound,
    setStep,
  } = useBookingStore();

  // --- Step 3: Ancillary Selections State ---
  const [checkedBags, setCheckedBags] = useState(0);
  const [mealOption, setMealOption] = useState('None');
  const [loungeAccess, setLoungeAccess] = useState(false);
  const [disruptionProtection, setDisruptionProtection] = useState(false);

  const ancillaryPriceTotal = useMemo(() => {
    let total = 0;
    total += checkedBags * 40;
    if (mealOption !== 'None') total += 18;
    if (loungeAccess) total += 55;
    if (disruptionProtection) total += 25;
    return total;
  }, [checkedBags, mealOption, loungeAccess, disruptionProtection]);

  const baseFare = selectedOutbound?.price ?? 450;
  const taxes = 65;
  const grandTotal = baseFare + seatPriceTotal + ancillaryPriceTotal + taxes;

  const activeStep = useMemo(() => {
    if (!passenger) return 1;
    if (selectedSeats && selectedSeats.length > 0 && currentStep < 3) return 2;
    return currentStep;
  }, [passenger, selectedSeats, currentStep]);

  // --- Step 1: Passenger Form State ---
  const [formFields, setFormFields] = useState<PassengerDetails>({
    firstName: '',
    lastName: '',
    passportNumber: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!formFields.firstName) nextErrors.firstName = 'First name required';
    if (!formFields.lastName) nextErrors.lastName = 'Last name required';
    if (!formFields.passportNumber) nextErrors.passportNumber = 'Passport specification required';
    if (!formFields.dateOfBirth) nextErrors.dateOfBirth = 'Date of birth required';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
    } else {
      setErrors({});
      setPassenger(formFields);
    }
  };



  // --- Step 4: Payment Brand Matching Logic ---
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCVC] = useState('');

  const cardBrand = useMemo(() => {
    const clean = cardNumber.replace(/\D/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(clean)) return 'mastercard';
    if (/^3[47]/.test(clean)) return 'amex';
    return 'unknown';
  }, [cardNumber]);

  return (
    <div className="max-w-[1200px] mx-auto px-sm py-lg grid grid-cols-1 lg:grid-cols-3 gap-md items-start">
      {/* Primary Funnel Column */}
      <div className="lg:col-span-2 space-y-md">
        {/* Minimalist Step Progress Tracker */}
        <div className="premium-glass rounded-xl p-sm border border-white/5 flex justify-between items-center relative overflow-hidden">
          {[
            { step: 1, label: 'Passenger' },
            { step: 2, label: 'Cabin Seat' },
            { step: 3, label: 'Ancillaries' },
            { step: 4, label: 'Payment' },
            { step: 5, label: 'Confirmation' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center flex-1 relative z-10">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  activeStep >= item.step
                    ? 'bg-vantage-accent text-vantage-dark shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                    : 'bg-white/5 border border-white/10 text-vantage-muted'
                }`}
              >
                {activeStep > item.step ? '✓' : item.step}
              </div>
              <span
                className={`text-[10px] uppercase tracking-wider mt-2xs font-medium ${activeStep >= item.step ? 'text-white' : 'text-vantage-muted'}`}
              >
                {item.label}
              </span>
            </div>
          ))}
          {/* Internal Progress Track Bar background lines */}
          <div className="absolute top-[29px] left-8 right-8 h-[1px] bg-white/10 -z-0" />
          <motion.div
            className="absolute top-[29px] left-8 h-[1px] bg-vantage-accent -z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${((activeStep - 1) / 4) * 85}%` }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
          />
        </div>

        {/* Multi-step Display Canvas */}
        <AnimatePresence mode="wait">
          {activeStep === 1 && (
            <motion.form
              key="step-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleFormSubmit}
              className="premium-glass rounded-2xl p-md border border-white/5 space-y-sm"
            >
              <div className="flex items-center gap-2xs border-b border-white/5 pb-xs">
                <User className="w-4 h-4 text-vantage-accent" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Passenger Document Verification
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                {/* Floating-Label Input Pairings */}
                <div className="relative">
                  <input
                    id="profile-firstName"
                    type="text"
                    value={formFields.firstName}
                    onChange={(e) => {
                      setFormFields({ ...formFields, firstName: e.target.value });
                    }}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-xs pt-md pb-2xs text-sm text-white focus:outline-none focus:border-vantage-accent peer transition-colors"
                    placeholder=" "
                  />
                  <label htmlFor="profile-firstName" className="absolute text-xs text-vantage-muted left-xs top-xs scale-100 origin-top-left transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:top-sm peer-focus:scale-75 peer-focus:top-2xs peer-focus:text-vantage-accent">
                    First Name
                  </label>
                  {errors.firstName && (
                    <span className="text-[10px] text-red-400 block mt-3xs">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                     id="profile-lastName"
                     type="text"
                     value={formFields.lastName}
                     onChange={(e) => {
                       setFormFields({ ...formFields, lastName: e.target.value });
                     }}
                     className="w-full bg-black/20 border border-white/10 rounded-xl px-xs pt-md pb-2xs text-sm text-white focus:outline-none focus:border-vantage-accent peer transition-colors"
                     placeholder=" "
                 />
                  <label htmlFor="profile-lastName" className="absolute text-xs text-vantage-muted left-xs top-xs scale-100 origin-top-left transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:top-sm peer-focus:scale-75 peer-focus:top-2xs peer-focus:text-vantage-accent">
                    Last Name
                  </label>
                  {errors.lastName && (
                    <span className="text-[10px] text-red-400 block mt-3xs">{errors.lastName}</span>
                  )}
                </div>

                <div className="relative">
                  <input id="profile-passportNumber"
                    type="text"
                    value={formFields.passportNumber}
                    onChange={(e) => {
                      setFormFields({ ...formFields, passportNumber: e.target.value });
                    }}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-xs pt-md pb-2xs text-sm text-white focus:outline-none focus:border-vantage-accent peer transition-colors"
                    placeholder=" "
                  />
                  <label htmlFor="profile-passportNumber" className="absolute text-xs text-vantage-muted left-xs top-xs scale-100 origin-top-left transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:top-sm peer-focus:scale-75 peer-focus:top-2xs peer-focus:text-vantage-accent">
                    Passport Number
                  </label>
                  {errors.passportNumber && (
                    <span className="text-[10px] text-red-400 block mt-3xs">
                      {errors.passportNumber}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    id="profile-dateOfBirth"
                    type="date"
                    value={formFields.dateOfBirth}
                    onChange={(e) => {
                      setFormFields({ ...formFields, dateOfBirth: e.target.value });
                    }}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-xs pt-md pb-2xs text-sm text-white focus:outline-none focus:border-vantage-accent peer transition-colors text-left"
                  />
                    <label htmlFor="profile-dateOfBirth" className="absolute text-[10px] text-vantage-accent left-xs top-2xs scale-75 origin-top-left">
                    Date of Birth
                  </label>
                  {errors.dateOfBirth && (
                    <span className="text-[10px] text-red-400 block mt-3xs">
                      {errors.dateOfBirth}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-xs flex justify-end">
                <button
                  type="submit"
                  className="px-md py-xs rounded-xl bg-vantage-accent text-vantage-dark font-bold text-xs tracking-wide uppercase hover:bg-white transition-colors duration-300"
                >
                  Save & Continue
                </button>
              </div>
            </motion.form>
          )}

          {activeStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <SeatSelector
                baseFare={baseFare}
                onSelectionComplete={(seatsArray) => {
                  const ids = seatsArray.map((s) => s.id);
                  const dynamicCost = seatsArray.reduce((acc, s) => acc + s.priceModifier, 0);
                  setSeats(ids, dynamicCost);
                }}
              />
            </motion.div>
          )}

          {activeStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="premium-glass rounded-2xl p-md border border-white/5 space-y-md"
            >
              <div className="flex items-center gap-2xs border-b border-white/5 pb-xs">
                <PlaneTakeoff className="w-4 h-4 text-vantage-accent" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Select Premium Ancillaries
                </h3>
              </div>

              <div className="space-y-sm">
                {/* Baggage Counter */}
                <div className="flex justify-between items-center bg-black/20 p-sm rounded-xl border border-white/5">
                  <div>
                    <h4 className="text-xs font-bold text-white">Checked Baggage ($40 / Bag)</h4>
                    <p className="text-[10px] text-vantage-muted">
                      Up to 3 checked pieces (50lbs/23kg each)
                    </p>
                  </div>
                  <div className="flex items-center gap-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setCheckedBags(Math.max(0, checkedBags - 1));
                      }}
                      className="w-8 h-8 rounded-lg bg-white/5 font-bold hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold text-white w-4 text-center">
                      {checkedBags}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCheckedBags(Math.min(3, checkedBags + 1));
                      }}
                      className="w-8 h-8 rounded-lg bg-white/5 font-bold hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Gourmet Dining */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-xs bg-black/20 p-sm rounded-xl border border-white/5">
                  <div>
                    <h4 className="text-xs font-bold text-white">Premium In-Flight Dining ($18)</h4>
                    <p className="text-[10px] text-vantage-muted">
                      Upgrade to our signature chef-curated hot meals
                    </p>
                  </div>
                  <select
                    value={mealOption}
                    onChange={(e) => {
                      setMealOption(e.target.value);
                    }}
                    className="bg-vantage-dark border border-white/10 text-xs rounded-lg p-2xs text-white focus:outline-none focus:border-vantage-accent"
                  >
                    <option value="None">Standard Cabin Snack (Included)</option>
                    <option value="Vegetarian Wellington">
                      Chef's Vegetarian Wellington ($18)
                    </option>
                    <option value="Pan-seared Salmon">Pan-seared Atlantic Salmon ($18)</option>
                    <option value="Filet Mignon">Prime Grilled Filet Mignon ($18)</option>
                  </select>
                </div>

                {/* VIP Lounge Pass */}
                <div className="flex justify-between items-center bg-black/20 p-sm rounded-xl border border-white/5">
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      VIP Airspace Lounge Access ($55)
                    </h4>
                    <p className="text-[10px] text-vantage-muted">
                      Luxury amenities, shower suites, premium buffet & bar
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={loungeAccess}
                    onChange={(e) => {
                      setLoungeAccess(e.target.checked);
                    }}
                    className="w-4 h-4 text-vantage-accent bg-black/20 border-white/10 rounded focus:ring-vantage-accent"
                  />
                </div>

                {/* Travel Protection */}
                <div className="flex justify-between items-center bg-black/20 p-sm rounded-xl border border-white/5">
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Flight Disruption Protection ($25)
                    </h4>
                    <p className="text-[10px] text-vantage-muted">
                      Full cash reimbursement for delays greater than 2 hours
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={disruptionProtection}
                    onChange={(e) => {
                      setDisruptionProtection(e.target.checked);
                    }}
                    className="w-4 h-4 text-vantage-accent bg-black/20 border-white/10 rounded focus:ring-vantage-accent"
                  />
                </div>
              </div>

              <div className="pt-xs flex justify-end">
                <button
                  onClick={() => {
                    setStep(4);
                  }}
                  className="px-md py-xs rounded-xl bg-vantage-accent text-vantage-dark font-bold text-xs tracking-wide uppercase hover:bg-white transition-colors duration-300"
                >
                  Continue to Payment
                </button>
              </div>
            </motion.div>
          )}

          {activeStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-sm items-start"
            >
              {/* Premium Credit Card Visualization Engine */}
              <div className="md:col-span-2 premium-glass p-sm rounded-2xl border border-white/5 bg-gradient-to-br from-vantage-surface to-vantage-slate/60 text-white min-h-[160px] flex flex-col justify-between shadow-xl relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-6 bg-amber-400/20 rounded-md border border-amber-400/30 flex items-center justify-center font-mono text-[8px] tracking-widest text-amber-300 font-bold">
                    CHIP
                  </div>
                  <div className="text-xs font-bold uppercase italic tracking-widest text-white/40">
                    {cardBrand === 'visa' && <span className="text-blue-400 font-black">VISA</span>}
                    {cardBrand === 'mastercard' && (
                      <span className="text-orange-400 font-black">MC</span>
                    )}
                    {cardBrand === 'amex' && (
                      <span className="text-emerald-400 font-black">AMEX</span>
                    )}
                    {cardBrand === 'unknown' && 'CARD'}
                  </div>
                </div>
                <div className="font-mono text-sm tracking-[0.18em] py-xs text-center text-white/90">
                  {cardNumber ?? '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-vantage-muted uppercase">
                  <div>
                    <span className="block text-[8px] opacity-40">Holder</span>
                    <span className="truncate max-w-[100px] inline-block">
                      {cardName ?? 'VALID NAMES'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] opacity-40">Expires</span>
                    <span>{cardExpiry ?? 'MM/YY'}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              </div>

              {/* Secure Payment Entries */}
              <div className="md:col-span-3 premium-glass p-sm rounded-2xl border border-white/5 space-y-xs">
                <div className="flex items-center gap-2xs border-b border-white/5 pb-2xs">
                  <Landmark className="w-4 h-4 text-vantage-accent" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Stripe Vault Interface
                  </h3>
                </div>

                <div className="space-y-xs">
                  <input
                    type="text"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(
                        e.target.value
                          .replace(/\s?/g, '')
                          .replace(/(\d{4})/g, '$1 ')
                          .trim()
                      );
                    }}
                    placeholder="Card Number"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-xs py-xs text-xs text-white focus:outline-none focus:border-vantage-accent transition-colors"
                  />
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => {
                      setCardName(e.target.value.toUpperCase());
                    }}
                    placeholder="Cardholder Name"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-xs py-xs text-xs text-white focus:outline-none focus:border-vantage-accent transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-xs">
                    <input
                      type="text"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => {
                        setCardExpiry(e.target.value);
                      }}
                      placeholder="MM/YY"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-xs py-xs text-xs text-white focus:outline-none focus:border-vantage-accent transition-colors text-center"
                    />
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => {
                        setCardCVC(e.target.value.replace(/\D/g, ''));
                      }}
                      placeholder="CVC"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-xs py-xs text-xs text-white focus:outline-none focus:border-vantage-accent transition-colors text-center"
                    />
                  </div>
                </div>

                <button
                  onClick={completePayment}
                  className="w-full mt-xs py-xs rounded-xl bg-vantage-accent text-vantage-dark font-bold text-xs tracking-wide uppercase shadow-lg hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2xs"
                >
                  <ShieldCheck className="w-4 h-4" /> Authorize Payment (${grandTotal})
                </button>
              </div>
            </motion.div>
          )}

          {activeStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="premium-glass rounded-2xl p-lg border border-vantage-accent/30 bg-vantage-surface/40 text-center space-y-sm"
            >
              <div className="w-12 h-12 bg-vantage-accent/10 border border-vantage-accent/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <CheckCircle2 className="w-6 h-6 text-vantage-accent" />
              </div>
              <div className="space-y-3xs">
                <h2 className="text-lg font-bold text-white tracking-wide">Manifest Confirmed</h2>
                <p className="text-xs text-vantage-muted max-w-sm mx-auto">
                  Your premium itinerary has been captured on-ledger. E-tickets and smart check-in
                  parameters were dispatched to your workspace.
                </p>
              </div>
              <div className="p-sm bg-black/20 rounded-xl border border-white/5 inline-block text-left font-mono text-xs text-white space-y-2xs">
                <div>
                  <span className="text-vantage-muted">PASSENGER:</span> {passenger?.lastName},{' '}
                  {passenger?.firstName}
                </div>
                <div>
                  <span className="text-vantage-muted">LOCATOR:</span> VX-
                  {Math.floor(100000 + Math.random() * 900000)}
                </div>
                <div>
                  <span className="text-vantage-muted">ALLOCATION:</span> {selectedSeats.join(', ')}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Right Column Order Summary Card */}
      <aside className="premium-glass rounded-2xl p-sm border border-white/5 space-y-sm sticky top-24 self-start">
        <div className="flex items-center gap-2xs pb-2xs border-b border-white/5">
          <PlaneTakeoff className="w-4 h-4 text-vantage-accent" />
          <h3 className="font-semibold text-xs tracking-wide uppercase text-white">
            Fare Computation
          </h3>
        </div>

        <div className="space-y-xs text-xs">
          <div className="flex justify-between text-vantage-muted">
            <span>Base Transit Fare</span>
            <span className="font-medium text-white">${baseFare}</span>
          </div>
          <div className="flex justify-between text-vantage-muted">
            <span>Cabin Seating Upgrades</span>
            <span className="font-medium text-vantage-accent">+${seatPriceTotal}</span>
          </div>
          {ancillaryPriceTotal > 0 && (
            <div className="flex justify-between text-vantage-muted">
              <span>Premium Ancillaries</span>
              <span className="font-medium text-vantage-accent">+${ancillaryPriceTotal}</span>
            </div>
          )}
          <div className="flex justify-between text-vantage-muted">
            <span>International Port Duties</span>
            <span className="font-medium text-white">${taxes}</span>
          </div>

          <div className="border-t border-white/5 pt-xs flex justify-between items-baseline">
            <span className="font-bold text-white text-sm">Total Summary</span>
            <span className="text-lg font-black text-white tracking-wide">${grandTotal}</span>
          </div>
        </div>

        <div className="p-2xs rounded-xl bg-white/5 border border-white/5 flex gap-2xs items-start text-[10px] text-vantage-muted">
          <ShieldCheck className="w-4 h-4 text-vantage-accent shrink-0 mt-3xs" />
          <p>
            This transaction matrix utilizes cryptographic token signing. Pricing conditions stay
            locked down for a 15-minute window.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default CheckoutPage;
