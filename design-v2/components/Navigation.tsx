'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  { label: 'About',     href: '/#about' },
  { label: 'Values',    href: '/#values' },
  { label: 'Services',  href: '/#services' },
  { label: 'Process',   href: '/#process' },
  { label: 'Team',      href: '/#team' },
  { label: 'FAQs',      href: '/#faqs' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-grey-07">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <Image src="/image/venous_logo.png" alt="The Venous Lounge" fill className="object-contain" />
          </div>
          <span className="font-medium tracking-tight">The Venous Lounge</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm text-grey-03 hover:text-grey-01 transition-colors rounded-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <Link href="/#contact" className="btn-primary">
            <span className="holo-bg w-7 h-7 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5 text-grey-01" />
            </span>
            Book a Consultation
          </Link>
        </div>

        <button
          aria-label="Menu"
          className="lg:hidden w-9 h-9 -mr-1 flex items-center justify-center rounded-full border border-grey-07"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-grey-07 bg-white">
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-grey-02 rounded-lg hover:bg-grey-08"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 self-start">
              <span className="holo-bg w-7 h-7 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-grey-01" />
              </span>
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
