import React from 'react'
import { ArrowRight, CheckCircle2, Wifi, BatteryCharging, Suitcase } from 'lucide-react'
import type { FlightOption } from '../types/flight'

interface PremiumTicketCardProps {
  flightData: FlightOption
  onSelect?: () => void
}

function formatDuration(minutes: number) {
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hrs}h ${mins.toString().padStart(2, '0')}m`
}

function formatSegmentLabel(segmentCount: number) {
  if (segmentCount === 1) return 'nonstop'
  return `${segmentCount} stops`
}

export function PremiumTicketCard({ flightData, onSelect }: PremiumTicketCardProps) {
  const outboundLeg = flightData.outbound[0]
  const outboundLast = flightData.outbound[flightData.outbound.length - 1]
  const totalOutboundDuration = flightData.outbound.reduce((sum, segment) => sum + segment.duration, 0)
  const segmentLabel = formatSegmentLabel(flightData.outbound.length - 1)
  const amenities = [
    {
      available: flightData.amenities.wifi,
      label: 'Wi-Fi included',
      icon: Wifi,
    },
    {
      available: flightData.amenities.power,
      label: 'Power outlet',
      icon: BatteryCharging,
    },
    {
      available: true,
      label: `Carry-on: ${flightData.amenities.baggage}`,
      icon: Suitcase,
    },
  ]

  const gradientId = `flight-curve-grad-${flightData.id || 'default'}`
  const glowId = `flight-node-glow-${flightData.id || 'default'}`

  return (
    <article className="premium-glass border border-white/10 rounded-[28px] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.18)] max-w-3xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-vantage-accent font-semibold">Premium experience</p>
          <h2 className="mt-3 text-2xl font-bold text-white tracking-tight">
            {outboundLeg.origin} <span className="text-vantage-accent">→</span> {outboundLast.destination}
          </h2>
          <p className="mt-2 text-sm text-vantage-muted">
            {outboundLeg.airline} • {outboundLeg.flightNumber} • {flightData.cabinClass.charAt(0).toUpperCase() + flightData.cabinClass.slice(1)} cabin
          </p>
        </div>

        <div className="rounded-3xl bg-white/5 px-5 py-4 text-right ring-1 ring-white/10 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.32em] text-vantage-muted">Starting from</p>
          <p className="mt-2 text-3xl font-semibold text-white">${flightData.price.toFixed(0)}</p>
          <p className="text-sm text-vantage-muted">Per passenger, premium service</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-black/20 p-5">
          <div className="flex items-center justify-between text-sm text-vantage-muted">
            <span>{outboundLeg.origin}</span>
            <span className="inline-flex items-center gap-1 text-vantage-accent font-semibold">
              {segmentLabel}
              <ArrowRight className="w-3 h-3" />
            </span>
            <span>{outboundLast.destination}</span>
          </div>

          <div className="mt-4 flex items-center justify-center group">
            <svg className="w-full h-12 overflow-visible [will-change:transform] [transform:translateZ(0)]" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <g className="transition-all duration-700 ease-out transform group-hover:translate-x-4 group-hover:-translate-y-2">
                <path
                  d="M 10 30 Q 100 5 190 30"
                  stroke={`url(#${gradientId})`}
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M 192 26 L198 30 L192 34 L190 32 L194 30 L190 28 Z"
                  fill="#a855f7"
                  opacity="0.92"
                />
              </g>

              <circle cx="10" cy="30" r="4" fill="#6366f1" filter={`url(#${glowId})`} />
              <circle cx="190" cy="30" r="4" fill="#10b981" filter={`url(#${glowId})`} />
            </svg>
          </div>

          <div className="mt-4 grid gap-3 text-white">
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.24em] text-vantage-muted">Departure</span>
              <span className="font-semibold">{outboundLeg.departureTime}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.24em] text-vantage-muted">Arrival</span>
              <span className="font-semibold">{outboundLast.arrivalTime}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <span className="text-xs uppercase tracking-[0.24em] text-vantage-muted">Total duration</span>
              <span className="font-semibold">{formatDuration(totalOutboundDuration)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-black/20 p-5">
          <div className="flex items-center justify-between text-sm text-vantage-muted">
            <span className="font-semibold text-white">Premium amenities</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-vantage-accent/10 px-3 py-1 text-[11px] text-vantage-accent">
              <CheckCircle2 className="w-4 h-4" /> Included
            </span>
          </div>

          <ul className="mt-4 space-y-3">
            {amenities.map(({ available, label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${available ? 'bg-vantage-accent/10 text-vantage-accent' : 'bg-white/5 text-vantage-muted'}`}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-white">{label}</p>
                  <p className="text-[11px] text-vantage-muted">{available ? 'Comfort guaranteed' : 'Standard cabin feature'}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {onSelect && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onSelect}
            className="inline-flex items-center gap-2 rounded-full bg-vantage-accent px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-vantage-accent/20 transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-vantage-accent focus:ring-offset-2"
            aria-label="Select premium ticket"
          >
            Choose premium
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </article>
  )
}
