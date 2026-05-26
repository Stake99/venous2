'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-grey-08 pt-16 lg:pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* CTA card */}
        <div className="card-elevated bg-grey-01 text-white relative overflow-hidden p-8 lg:p-14">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] holo-bg opacity-20 blur-3xl rounded-full pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <h2 className="heading-section text-white">
                Your Health.<br />Our Priority. <span className="holo-text">Always.</span>
              </h2>
              <p className="text-white/60 mt-5 max-w-md leading-relaxed">
                Book a consultation with Dr Sesing today. Walk in, walk out — covered by most major South African medical aids.
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
              />
              <button type="submit" className="btn-primary !bg-white !text-grey-01 hover:!bg-grey-08">
                <span className="holo-bg w-7 h-7 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-grey-01" />
                </span>
                Get in touch
              </button>
            </form>
          </div>
        </div>

        {/* Info grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 w-fit mb-5">
              <div className="relative w-9 h-9">
                <Image src="/image/venous_logo.png" alt="The Venous Lounge" fill className="object-contain" />
              </div>
              <span className="font-medium tracking-tight">The Venous Lounge</span>
            </Link>
            <p className="text-grey-04 text-sm leading-relaxed max-w-sm">
              Dr Sesing Surgery & Aesthetics — specialised vein and general surgical care in Phahameng, Bloemfontein.
            </p>
            <div className="flex gap-2 mt-6">
              {[
                { Icon: Facebook,  label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter,   label: 'Twitter' },
                { Icon: Linkedin,  label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full border border-grey-07 flex items-center justify-center text-grey-03 hover:text-grey-01 hover:bg-white transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-grey-05 font-medium mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li className="text-grey-03">6571 Dr Lebona Street<br />Phahameng, Bloemfontein</li>
              <li><a href="tel:+27514479589" className="text-grey-03 hover:text-grey-01">+27 51 447 9589</a></li>
              <li><a href="mailto:dr.sesingsurg@gmail.com" className="text-grey-03 hover:text-grey-01">dr.sesingsurg@gmail.com</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-grey-05 font-medium mb-4">Hours</p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-grey-03"><span>Mon–Fri</span><span>08:00 – 22:00</span></li>
              <li className="flex justify-between text-grey-03"><span>Sat–Sun</span><span>08:00 – 13:00</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-grey-07 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-grey-05">
          <p>© {year} The Venous Lounge. All rights reserved.</p>
          <p>All major South African medical aids accepted.</p>
        </div>
      </div>
    </footer>
  );
}
