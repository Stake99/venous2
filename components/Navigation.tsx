'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const services = [
    { name: 'Varicose Veins', href: '/services/varicose-veins', icon: '🩺' },
    { name: 'Spider Veins', href: '/services/spider-veins', icon: '💉' },
    { name: 'Aesthetic Services', href: '/services/aesthetics', icon: '✨' },
    { name: 'View All Services', href: '/services', icon: '🏥' },
  ];

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setServicesOpen(false);
    }, 300); // 300ms delay before closing
    setTimeoutId(id);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/image/venous_logo.png"
                  alt="The Venous Lounge Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-gray-800 group-hover:text-black transition-colors">The Venous Lounge</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-black transition-colors font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-black transition-colors font-medium relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-gray-700 hover:text-black transition-colors font-medium flex items-center group">
                Services
                <svg className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </button>
              
              {/* Dropdown Menu */}
              {servicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl py-2 animate-fadeIn border border-gray-100"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group"
                      onClick={() => {
                        setServicesOpen(false);
                        if (timeoutId) clearTimeout(timeoutId);
                      }}
                    >
                      <span className="text-2xl mr-3 transform group-hover:scale-110 transition-transform">{service.icon}</span>
                      <span className="text-gray-700 group-hover:text-black font-medium">{service.name}</span>
                      <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-black transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/contact" className="text-gray-700 hover:text-black transition-colors font-medium relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/booking" 
              className="bg-gradient-to-r from-black to-gray-500 text-white px-6 py-2 rounded-full hover:from-gray-900 hover:to-black transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-black focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-black rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-black rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            
            {/* Mobile Services Submenu */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-black rounded-md transition-colors"
              >
                <span>Services</span>
                <svg className={`w-4 h-4 transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="pl-4 space-y-1">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-black rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-xl mr-2">{service.icon}</span>
                      <span>{service.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              href="/contact" 
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-black rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/booking" 
              className="block mx-3 my-2 px-3 py-2 bg-gradient-to-r from-black to-gray-500 text-white text-center rounded-full hover:from-gray-900 hover:to-black transition-all shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}
