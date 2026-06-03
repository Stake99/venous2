'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, Menu, X, CalendarDays, Activity, Sparkles, Stethoscope, LayoutGrid } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const services = [
    { name: 'Varicose Veins',     href: '/services/varicose-veins', Icon: Activity },
    { name: 'Spider Veins',       href: '/services/spider-veins',   Icon: Sparkles },
    { name: 'Aesthetic Services', href: '/services/aesthetics',     Icon: Stethoscope },
    { name: 'View All Services',  href: '/services',                Icon: LayoutGrid },
  ];

  const handleMouseEnter = () => {
    if (timeoutId) { clearTimeout(timeoutId); setTimeoutId(null); }
    setServicesOpen(true);
  };
  const handleMouseLeave = () => {
    const id = setTimeout(() => setServicesOpen(false), 300);
    setTimeoutId(id);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-graphite bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              <Image src="/image/venous_logo.png" alt="The Venous Lounge" fill className="object-contain" priority />
            </div>
            <span className="text-ivory font-semibold text-lg tracking-tight">The Venous Lounge</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home',    href: '/' },
              { label: 'About',   href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="relative text-silver hover:text-ivory text-sm font-medium transition-colors duration-200 group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button className="relative text-silver hover:text-ivory text-sm font-medium transition-colors duration-200 flex items-center gap-1 group">
                Services
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl border border-graphite bg-white/90 backdrop-blur-xl shadow-2xl py-2 overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {services.map((s, i) => (
                    <Link
                      key={i}
                      href={s.href}
                      className="flex items-center gap-3 px-4 py-2.5 text-silver hover:text-ivory hover:bg-ink transition-all duration-150 text-sm"
                      onClick={() => { setServicesOpen(false); if (timeoutId) clearTimeout(timeoutId); }}
                    >
                      <s.Icon className="w-4 h-4 text-gold flex-shrink-0" />
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/booking" className="btn-glow text-sm">
              <div className="glow-ring" />
              <CalendarDays className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Book Appointment</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-mist hover:text-ivory"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-graphite bg-ink">
          <div className="px-4 py-4 space-y-1">
            {[
              { label: 'Home',    href: '/' },
              { label: 'About',   href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="block px-3 py-2.5 text-silver hover:text-ivory hover:bg-ink rounded-xl text-sm transition-all"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-silver hover:text-ivory hover:bg-ink rounded-xl text-sm transition-all"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {services.map((s, i) => (
                    <Link
                      key={i}
                      href={s.href}
                      className="flex items-center gap-2 px-3 py-2 text-silver hover:text-ivory hover:bg-ink rounded-xl text-sm transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <s.Icon className="w-4 h-4 text-gold" />{s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/booking"
                className="block text-center btn-glow text-sm w-full"
                onClick={() => setIsOpen(false)}
              >
                <div className="glow-ring" />
                <span className="relative z-10">Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
