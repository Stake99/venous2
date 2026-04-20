'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VaricoseVeinsPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Link href="/services" className="inline-flex items-center text-black hover:text-gray-900 mb-6 group">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          
          <div className="flex items-center mb-6">
            <div className="text-6xl mr-4">🦵</div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">Varicose Veins Treatment</h1>
              <p className="text-xl text-gray-600 mt-2">Advanced Minimally Invasive Solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About Varicose Veins</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Varicose veins are enlarged, twisted veins that commonly appear in the legs. At The Venous Lounge, 
                  we specialize in modern, minimally invasive treatments that allow you to walk in and walk out the same day.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our procedures are performed by Dr Sesing, an experienced vein specialist, using the latest 
                  techniques to ensure minimal discomfort and maximum results.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Treatment Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Endovenous Laser Ablation (EVLA)',
                    'Radiofrequency Ablation',
                    'Sclerotherapy',
                    'Ambulatory Phlebectomy',
                    'Ultrasound-Guided Treatment',
                    'Compression Therapy',
                    'Medical Consultations',
                    'Follow-up Care',
                  ].map((service, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-black mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Symptoms We Treat</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Visible twisted veins',
                    'Leg pain and aching',
                    'Swelling in legs',
                    'Heavy feeling in legs',
                    'Skin discoloration',
                    'Itching around veins',
                    'Leg cramps',
                    'Restless legs',
                  ].map((condition, index) => (
                    <div key={index} className="bg-white rounded-xl p-3 shadow-sm">
                      <span className="text-gray-700 font-medium">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
                <ul className="space-y-4">
                  {[
                    'Walk-in, walk-out procedures - no hospital stay required',
                    'All major medical aids accepted',
                    'Experienced vein specialist - Dr Sesing',
                    'Latest minimally invasive techniques',
                    'Flexible appointment times (Mon-Fri: 08:00-22:00, Sat: 08:00-13:00)',
                    'Comfortable lounge-style environment',
                    'Comprehensive follow-up care',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Book a Consultation</h3>
                <p className="mb-6">Schedule your varicose vein assessment today.</p>
                <Link 
                  href="/booking" 
                  className="block w-full bg-white text-black px-6 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-center"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">📍</div>
                    <div className="text-gray-700 text-sm">
                      Unit 3, Preller Square<br />
                      Kellner Street, Westdene<br />
                      Bloemfontein, 9301
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📞</div>
                    <a href="tel:+27514479589" className="text-gray-700">+27 51 447 9589</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">✉️</div>
                    <a href="mailto:dr.sesingsurg@gmail.com" className="text-gray-700 text-sm">dr.sesingsurg@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-gray-50 rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Operating Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday:</span>
                    <span>08:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday:</span>
                    <span>08:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Medical Aid</h3>
                <p className="text-gray-600 mb-4">We accept all major medical aid schemes.</p>
                <div className="flex items-center space-x-3 text-black font-semibold">
                  <div className="text-2xl">💳</div>
                  <div>All Major Schemes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
