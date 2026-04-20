'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AestheticsPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Link href="/services" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6 group">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          
          <div className="flex items-center mb-6">
            <div className="text-6xl mr-4">✨</div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">Aesthetic Services</h1>
              <p className="text-xl text-gray-600 mt-2">Enhance Your Natural Beauty</p>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Aesthetic Services</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  At The Venous Lounge, we offer a comprehensive range of aesthetic and cosmetic procedures 
                  designed to help you look and feel your best. Our treatments are performed by Dr Sesing 
                  in a comfortable, lounge-style environment.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We combine medical expertise with aesthetic artistry to deliver natural-looking results 
                  that enhance your confidence and well-being.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Aesthetic Treatments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Anti-Wrinkle Injections',
                      icon: '💉',
                      description: 'Reduce fine lines and wrinkles for a smoother, more youthful appearance',
                      gradient: 'from-pink-400 to-pink-600',
                    },
                    {
                      title: 'Dermal Fillers',
                      icon: '💧',
                      description: 'Restore volume and contour to enhance facial features naturally',
                      gradient: 'from-purple-400 to-purple-600',
                    },
                    {
                      title: 'Skin Rejuvenation',
                      icon: '✨',
                      description: 'Advanced treatments for clearer, brighter, more radiant skin',
                      gradient: 'from-gray-800 to-black',
                    },
                    {
                      title: 'Chemical Peels',
                      icon: '🧴',
                      description: 'Exfoliate and refresh skin for improved texture and tone',
                      gradient: 'from-green-400 to-green-600',
                    },
                    {
                      title: 'Laser Treatments',
                      icon: '⚡',
                      description: 'Target pigmentation, scars, and skin imperfections',
                      gradient: 'from-yellow-400 to-orange-600',
                    },
                    {
                      title: 'Skin Tightening',
                      icon: '🎯',
                      description: 'Non-surgical procedures to firm and lift sagging skin',
                      gradient: 'from-red-400 to-pink-600',
                    },
                  ].map((treatment, index) => (
                    <div key={index} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${treatment.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative z-10">
                        <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{treatment.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                          {treatment.title}
                        </h3>
                        <p className="text-gray-600 group-hover:text-white text-sm transition-colors duration-300">
                          {treatment.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Procedures</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Botox® & Dysport®',
                      areas: 'Forehead, frown lines, crow\'s feet',
                      duration: '15-20 minutes',
                      results: '3-6 months',
                    },
                    {
                      name: 'Hyaluronic Acid Fillers',
                      areas: 'Lips, cheeks, nasolabial folds',
                      duration: '30-45 minutes',
                      results: '6-18 months',
                    },
                    {
                      name: 'Microneedling',
                      areas: 'Face, neck, décolletage',
                      duration: '45-60 minutes',
                      results: 'Progressive improvement',
                    },
                    {
                      name: 'IPL Photofacial',
                      areas: 'Sun damage, pigmentation, redness',
                      duration: '30-45 minutes',
                      results: 'Multiple sessions',
                    },
                  ].map((procedure, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                      <h4 className="font-semibold text-gray-900 text-lg mb-3">{procedure.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Treatment Areas:</span>
                          <div className="text-gray-700 font-medium">{procedure.areas}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <div className="text-gray-700 font-medium">{procedure.duration}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Results Last:</span>
                          <div className="text-gray-700 font-medium">{procedure.results}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Treatment Journey</h2>
                <div className="space-y-6">
                  {[
                    {
                      step: '1',
                      title: 'Consultation',
                      description: 'Discuss your goals and concerns with Dr Sesing. We\'ll create a personalized treatment plan.',
                      icon: '👥',
                    },
                    {
                      step: '2',
                      title: 'Preparation',
                      description: 'Receive pre-treatment instructions and answer any questions you may have.',
                      icon: '📋',
                    },
                    {
                      step: '3',
                      title: 'Treatment',
                      description: 'Relax in our comfortable lounge while we perform your procedure with precision and care.',
                      icon: '✨',
                    },
                    {
                      step: '4',
                      title: 'Aftercare',
                      description: 'Follow simple post-treatment guidelines and schedule follow-up appointments as needed.',
                      icon: '💙',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-2xl flex flex-col items-center justify-center font-bold flex-shrink-0 shadow-lg">
                        <div className="text-2xl">{item.icon}</div>
                        <div className="text-xs">{item.step}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us for Aesthetics?</h2>
                <ul className="space-y-4">
                  {[
                    'Experienced aesthetic specialist - Dr Sesing',
                    'Natural-looking, subtle results',
                    'Premium quality products and equipment',
                    'Personalized treatment plans',
                    'Comfortable, private lounge environment',
                    'Flexible appointment times',
                    'Comprehensive aftercare support',
                    'Competitive pricing',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-3xl p-8 shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Book Your Consultation</h3>
                <p className="mb-6">Discover how aesthetic treatments can enhance your natural beauty.</p>
                <Link 
                  href="/booking" 
                  className="block w-full bg-white text-pink-600 px-6 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-center"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Treatment Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <div className="font-semibold text-gray-900">Quick Procedures</div>
                      <div className="text-gray-600 text-sm">Most treatments under 1 hour</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🚶</div>
                    <div>
                      <div className="font-semibold text-gray-900">Minimal Downtime</div>
                      <div className="text-gray-600 text-sm">Resume activities quickly</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">✨</div>
                    <div>
                      <div className="font-semibold text-gray-900">Natural Results</div>
                      <div className="text-gray-600 text-sm">Subtle, beautiful enhancements</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">💰</div>
                    <div>
                      <div className="font-semibold text-gray-900">Affordable</div>
                      <div className="text-gray-600 text-sm">Competitive pricing</div>
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

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg">
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

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 shadow-lg border-2 border-yellow-200">
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">💡</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">First Time?</h4>
                    <p className="text-gray-600 text-sm">
                      Book a complimentary consultation to discuss your aesthetic goals and learn about the best treatments for you.
                    </p>
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
