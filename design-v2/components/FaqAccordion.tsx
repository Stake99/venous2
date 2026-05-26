'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <FaqItem key={f.q} n={i + 1} q={f.q} a={f.a} />
      ))}
    </div>
  );
}

function FaqItem({ n, q, a }: { n: number; q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-base overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-grey-05 text-sm w-5">{n}</span>
          <span className="text-grey-01 font-medium tracking-tight">{q}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-grey-04 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 pl-[3.25rem] text-grey-04 text-sm leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}
