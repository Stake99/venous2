'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CardiologyPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Link href="/services" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6 group">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          
          <div className="flex items-center mb-6">
            <div className="text-6xl mr-4">❤️</div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">Cardiology</h1>
              <p className="text-xl text-gray-600 mt-2">Expert Heart Care</p>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Cardiology Department</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Our Cardiology department offers comprehensive cardiovascular care using state-of-the-art diagnostic 
                  equipment and the latest treatment methods. Our team of experienced cardiologists is dedicated to 
                  preventing, diagnosing, and treating heart conditions.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We provide both preventive care and advanced treatments for complex cardiac conditions, ensuring 
                  the best possible outcomes for our patients.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cardiology Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'ECG and Stress Testing',
                    'Echocardiography',
                    'Heart Disease Management',
                    'Cardiac Rehabilitation',
                    'Angiography',
                    'Pacemaker Management',
                    'Heart Failure Treatment',
                    'Arrhythmia Management',
                  ].map((service, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Conditions We Treat</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Coronary Artery Disease',
                    'Heart Failure',
                    'Arrhythmias',
                    'Hypertension',
                    'Valvular Heart Disease',
                    'Cardiomyopathy',
                    'Congenital Heart Defects',
                    'Peripheral Artery Disease',
                  ].map((condition, index) => (
                    <div key={index} className="bg-white rounded-xl p-3 shadow-sm">
                      <span className="text-gray-700 font-medium">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-600 to-pink-600 rounded-3xl p-8 shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Book an Appointment</h3>
                <p className="mb-6">Schedule your cardiology consultation today.</p>
                <Link 
                  href="/booking" 
                  className="block w-full bg-white text-red-600 px-6 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-center"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Cardiologists</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Dr. Michael Chen', specialty: 'Interventional Cardiology' },
                    { name: 'Dr. Lisa Anderson', specialty: 'Electrophysiology' },
                    { name: 'Dr. Robert Taylor', specialty: 'Heart Failure' },
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

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency?</h3>
                <p className="text-gray-600 mb-4">For cardiac emergencies, call 911 immediately.</p>
                <div className="flex items-center space-x-3 text-red-600 font-semibold">
                  <div className="text-2xl">🚨</div>
                  <div>Emergency: 911</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
