'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SpiderVeinsPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1600&q=80"
            alt="Spider veins treatment"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/90 to-pink-50/70" />
        </div>
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
            <div className="text-6xl mr-4">💉</div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">Spider Veins Treatment</h1>
              <p className="text-xl text-gray-600 mt-2">Clear, Beautiful Skin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Treatment Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
                alt="Spider vein treatment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-bold text-2xl mb-2">Sclerotherapy Treatment</h3>
                  <p className="text-white/90">Effective spider vein removal</p>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80"
                alt="Happy patient results"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-bold text-2xl mb-2">Beautiful Results</h3>
                  <p className="text-white/90">Clear, healthy-looking skin</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About Spider Veins</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Spider veins (also called thread veins or telangiectasia) are small, damaged veins that appear 
                  on the surface of the legs or face. They are usually red, purple, or blue and can look like 
                  spider webs or tree branches.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  At The Venous Lounge, we offer effective, minimally invasive treatments to remove spider veins 
                  and restore clear, beautiful skin. Our procedures are quick, virtually painless, and require 
                  no downtime.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Treatment Options</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Sclerotherapy',
                      description: 'The gold standard treatment where a solution is injected directly into the vein, causing it to collapse and fade.',
                      benefits: ['Highly effective', 'Minimal discomfort', 'Quick procedure', 'No downtime'],
                    },
                    {
                      title: 'Laser Therapy',
                      description: 'Non-invasive treatment using focused light to target and eliminate spider veins.',
                      benefits: ['No needles', 'Precise targeting', 'Suitable for facial veins', 'Fast recovery'],
                    },
                    {
                      title: 'Combination Therapy',
                      description: 'Using both sclerotherapy and laser for optimal results on stubborn veins.',
                      benefits: ['Maximum effectiveness', 'Customized approach', 'Better outcomes', 'Comprehensive care'],
                    },
                  ].map((treatment, index) => (
                    <div key={index} className="border-l-4 border-purple-600 pl-6 py-2">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{treatment.title}</h3>
                      <p className="text-gray-600 mb-3">{treatment.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {treatment.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Causes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Heredity/Genetics',
                    'Pregnancy',
                    'Hormonal changes',
                    'Prolonged standing',
                    'Sun exposure',
                    'Age',
                    'Weight gain',
                    'Previous vein surgery',
                  ].map((cause, index) => (
                    <div key={index} className="bg-white rounded-xl p-3 shadow-sm flex items-center">
                      <svg className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-gray-700 font-medium">{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What to Expect</h2>
                <div className="space-y-4">
                  {[
                    {
                      step: '1',
                      title: 'Consultation',
                      description: 'Dr Sesing will examine your veins and recommend the best treatment approach.',
                    },
                    {
                      step: '2',
                      title: 'Treatment',
                      description: 'The procedure typically takes 15-30 minutes. You can walk in and walk out the same day.',
                    },
                    {
                      step: '3',
                      title: 'Recovery',
                      description: 'Resume normal activities immediately. Veins will gradually fade over 3-6 weeks.',
                    },
                    {
                      step: '4',
                      title: 'Follow-up',
                      description: 'We monitor your progress and provide additional treatments if needed.',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg mb-1">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-gray-50 rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits of Treatment</h2>
                <ul className="space-y-3">
                  {[
                    'Improved appearance and confidence',
                    'Quick, in-office procedures',
                    'Minimal to no downtime',
                    'Long-lasting results',
                    'Safe and proven techniques',
                    'Covered by most medical aids',
                    'Experienced specialist care',
                    'Comfortable lounge environment',
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
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Book Your Treatment</h3>
                <p className="mb-6">Get clear, beautiful skin with our spider vein treatments.</p>
                <Link 
                  href="/booking" 
                  className="block w-full bg-white text-purple-600 px-6 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-center"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">⏱️</div>
                    <div>
                      <div className="font-semibold text-gray-900">Procedure Time</div>
                      <div className="text-gray-600 text-sm">15-30 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🚶</div>
                    <div>
                      <div className="font-semibold text-gray-900">Recovery</div>
                      <div className="text-gray-600 text-sm">Immediate return to activities</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">📅</div>
                    <div>
                      <div className="font-semibold text-gray-900">Results</div>
                      <div className="text-gray-600 text-sm">Visible in 3-6 weeks</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">💳</div>
                    <div>
                      <div className="font-semibold text-gray-900">Medical Aid</div>
                      <div className="text-gray-600 text-sm">Most schemes accepted</div>
                    </div>
                  </div>
                </div>
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

              <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-8 shadow-lg">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
