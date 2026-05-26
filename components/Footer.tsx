import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#26262e] overflow-hidden">
      {/* Grid lines */}
      <div className="grid-lines">
        {[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}
      </div>

      {/* Glow orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                <Image src="/image/venous_logo.png" alt="The Venous Lounge" fill className="object-contain" />
              </div>
              <span className="text-white font-semibold text-lg">The Venous Lounge</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Your trusted partner for vein treatment and aesthetic services in Phahameng, Bloemfontein, South Africa.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { label: 'Twitter',   path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Facebook',  path: 'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z' },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-5">Quick Links</p>
            <ul className="space-y-3">
              {[
                { name: 'About Us',           href: '/about' },
                { name: 'Our Services',       href: '/services' },
                { name: 'Varicose Veins',     href: '/services/varicose-veins' },
                { name: 'Spider Veins',       href: '/services/spider-veins' },
                { name: 'Aesthetic Services', href: '/services/aesthetics' },
                { name: 'Book Appointment',   href: '/booking' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/40 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <svg className="w-3 h-3 text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-5">Contact</p>
            <ul className="space-y-4">
              {[
                { icon: '📍', text: '6571 Dr Lebona Street, Phahameng, Bloemfontein' },
                { icon: '📞', text: '+27 51 447 9589', href: 'tel:+27514479589' },
                { icon: '✉️', text: 'dr.sesingsurg@gmail.com', href: 'mailto:dr.sesingsurg@gmail.com' },
                { icon: '🕐', text: 'Mon–Fri 08:00–22:00 · Sat–Sun 08:00–13:00' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-base mt-0.5">{item.icon}</span>
                  {item.href
                    ? <a href={item.href} className="text-white/40 hover:text-white text-sm transition-colors duration-200">{item.text}</a>
                    : <span className="text-white/40 text-sm">{item.text}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© {year} Venous Lounge Medical Center. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              { label: 'Privacy Policy', href: '/contact' },
              { label: 'Terms of Service', href: '/contact' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-white/25 hover:text-white/60 text-xs transition-colors duration-200">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
