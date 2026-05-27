import React from 'react';

export type Tab = { id: 'oneway' | 'roundtrip' | 'multicity'; label: string };

const tabs: Tab[] = [
  { id: 'oneway', label: 'One-way' },
  { id: 'roundtrip', label: 'Round-trip' },
  { id: 'multicity', label: 'Multi-city' },
];

type Props = {
  value: string;
  onChange: (id: Tab['id']) => void;
};

export const TabSwitcher: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="inline-flex items-center gap-2 bg-white/5 p-1 rounded-lg">
      {tabs.map((t) => (
        <button
          key={t.id}
          aria-pressed={value === t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            value === t.id ? 'bg-white/10 shadow-sm' : 'hover:bg-white/5'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
