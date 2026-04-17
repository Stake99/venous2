'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PediatricsPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Link href="/services" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 group">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          
          <div className="flex items-center mb-6">
            <div className="text-6xl mr-4">👶</div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">Pediatrics</h1>
              <p className="text-xl text-gray-600 mt-2">Specialized Care for Children</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Pediatrics Department</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Our Pediatrics department provides comprehensive healthcare for infants, children, and adolescents 
                  in a warm, friendly environment designed to make young patients feel comfortable and safe.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We focus on preventive care, early detection of health issues, and supporting healthy growth 
                  and development from birth through adolescence.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Pediatric Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Well-Child Visits',
                    'Immunizations',
                    'Growth & Development Monitoring',
                    'Pediatric Urgent Care',
                    'Newborn Care',
                    'Adolescent Medicine',
                    'Behavioral Health',
                    'Sports Physicals',
                  ].map((service, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Book an Appointment</h3>
                <p className="mb-6">Schedule your child's visit today.</p>
                <Link 
                  href="/booking" 
                  className="block w-full bg-white text-purple-600 px-6 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-center"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Pediatricians</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics' },
                    { name: 'Dr. David Kim', specialty: 'Adolescent Medicine' },
                  ].map((doctor, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="text-3xl">👨‍⚕️</div>
                      <div>
                        <div className="font-semibold text-gray-900">{doctor.name}</div>
                        <div className="text-sm text-gray-600">{doctor.specialty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
