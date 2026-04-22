'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* FREE CONSULTATION ALERT BANNER */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white py-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white text-purple-600 rounded-full p-3 animate-bounce">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xl">🎉 FREE CONSULTATION ALERT</span>
                  <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold animate-pulse">LIMITED TIME</span>
                </div>
                <p className="text-sm text-white/90 mt-1">
                  <span className="font-semibold">22 - 30 April</span> • Full medical assessment + personalized prescription • No medication included
                </p>
              </div>
            </div>
            <Link 
              href="/booking" 
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
            >
              Book Free Consultation →
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
            style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` }}
          />
          <div 
            className="absolute top-40 right-10 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"
            style={{ transform: `translate(${-scrollY * 0.1}px, ${scrollY * 0.08}px)` }}
          />
          <div 
            className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"
            style={{ transform: `translate(${scrollY * 0.05}px, ${-scrollY * 0.1}px)` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div 
              className="space-y-8"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <div className="inline-block">
                <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  🎉 NOW OPEN - Venous Lounge Medical Center
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Your Health, our
                <span className="block text-black">
                  Priority Always
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Expert vein treatment and aesthetic services at Venous Lounge Medical Center in Phahameng, Bloemfontein. 
                All major medical aids accepted. Walk-in, walk-out procedures.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/booking" 
                  className="group relative bg-black text-white px-8 py-4 rounded-full hover:bg-gray-900 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-2xl hover:scale-105 transform"
                >
                  <span className="relative z-10">Book Appointment</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-black to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link 
                  href="/services" 
                  className="bg-white text-black border-2 border-black px-8 py-4 rounded-full hover:bg-gray-50 transition-all duration-300 font-semibold text-center shadow-md hover:shadow-xl hover:scale-105 transform"
                >
                  Our Services
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { number: '15+', label: 'Years Experience' },
                  { number: '1000+', label: 'Happy Patients' },
                  { number: '100%', label: 'Medical Aid' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-black">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Trust Badges with Images */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="relative h-24 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80"
                    alt="Medical certification"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                    <p className="text-white text-xs font-semibold">Certified Medical Facility</p>
                  </div>
                </div>
                <div className="relative h-24 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&q=80"
                    alt="Professional team"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                    <p className="text-white text-xs font-semibold">Expert Medical Team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Doctor's Image with 3D Effect */}
            <div 
              className="relative perspective-1000"
              style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
            >
              <div className="relative">
                {/* Main Doctor Image Card */}
                <div className="relative z-10 mb-6">
                  <div className="bg-white rounded-3xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 backdrop-blur-sm bg-opacity-90">
                    <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                      <Image
                        src="/image/venous.png"
                        alt="Dr Sesing - The Venous Lounge"
                        fill
                        className="object-cover"
                        priority
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {/* Doctor Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1">Dr Sesing</h3>
                        <p className="text-gray-100">Vein & Aesthetic Specialist</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Info Cards */}
                <div className="relative z-10 space-y-4">
                  {[
                    {
                      icon: '🩺',
                      title: 'Vein Specialists',
                      desc: 'Expert treatment for varicose & spider veins',
                      delay: 0,
                    },
                    {
                      icon: '✨',
                      title: 'Aesthetic Services',
                      desc: 'Professional cosmetic procedures',
                      delay: 100,
                    },
                    {
                      icon: '🏥',
                      title: 'Medical Aid Accepted',
                      desc: 'All major schemes welcome',
                      delay: 200,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 backdrop-blur-sm bg-opacity-90"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${item.delay}ms both`,
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{item.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-800 rounded-full filter blur-2xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-300 rounded-full filter blur-2xl opacity-20 animate-pulse animation-delay-1000" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section with 3D Effect */}
      <section className="relative py-20 bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 'Mon-Fri', label: '08:00 AM - 10:00 PM', icon: '🕐' },
              { number: 'Sat-Sun', label: '08:00 AM - 01:00 PM', icon: '📅' },
              { number: 'Medical Aid', label: 'All Accepted', icon: '💳' },
              { number: 'Phahameng', label: 'Bloemfontein', icon: '📍' },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center transform hover:scale-110 transition-transform duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                <div className="text-5xl mb-2">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE CONSULTATION PROMOTION SECTION */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-300 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            {/* Medical Image */}
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
                alt="Doctor consultation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-blue-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-3xl font-bold mb-2">Professional Care</h3>
                <p className="text-white/90">Expert medical assessment by qualified professionals</p>
              </div>
            </div>

            {/* Promotion Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 px-8 py-6 text-center">
                <div className="inline-block bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold mb-3 animate-pulse">
                  ⏰ LIMITED TIME OFFER
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  FREE CONSULTATION ALERT
                </h2>
                <p className="text-xl text-white/90 font-semibold">
                  📅 22 April - 30 April 2026
                </p>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">What's Included</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700"><strong>Full professional medical assessment</strong></span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700"><strong>Personalized prescription provided</strong></span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-red-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-700">Medication <strong>not included</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-green-100 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Who Should Book?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-2xl mr-2">👥</span>
                      <span className="text-gray-700">Those who have <strong>delayed check-ups</strong></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-2xl mr-2">🤔</span>
                      <span className="text-gray-700">Need <strong>clarity on symptoms</strong></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-2xl mr-2">❤️</span>
                      <span className="text-gray-700">Ready to <strong>prioritize your health</strong></span>
                    </li>
                  </ul>
                </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8">
                  <div className="flex items-start">
                    <div className="text-4xl mr-4">💡</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Why Take Advantage?</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We believe everyone deserves access to quality healthcare. This <strong>no-cost consultation</strong> removes financial barriers, 
                        making it easier for you to get the professional medical guidance you need. Don't let uncertainty about your health linger—
                        take the first step today!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link 
                    href="/booking" 
                    className="inline-block bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white px-12 py-5 rounded-full hover:shadow-2xl transition-all duration-300 font-bold text-xl transform hover:scale-105"
                  >
                    🎉 Book Your FREE Consultation Now
                  </Link>
                  <p className="text-gray-500 mt-4 text-sm">
                    ⏰ Offer valid from 22 April to 30 April 2026 only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Parallax Cards */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gray-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="text-black font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Comprehensive Vein & Aesthetic Care
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Minimally invasive procedures with expert care
            </p>
          </div>

          {/* Service Images Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80"
                alt="Vein treatment procedure"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Vein Treatment</h3>
                <p className="text-white/90">State-of-the-art minimally invasive procedures</p>
              </div>
            </div>
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
                alt="Aesthetic services"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Aesthetic Services</h3>
                <p className="text-white/90">Professional cosmetic treatments and care</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Varicose Veins',
                description: 'Advanced treatment for varicose veins using minimally invasive techniques',
                icon: '🦵',
                gradient: 'from-gray-800 to-black',
                href: '/services/varicose-veins',
              },
              {
                title: 'Spider Veins',
                description: 'Effective removal of spider and thread veins for clearer skin',
                icon: '💉',
                gradient: 'from-purple-400 to-purple-600',
                href: '/services/spider-veins',
              },
              {
                title: 'Venous Ulcers',
                description: 'Specialized treatment for chronic venous ulcers and leg swelling',
                icon: '🩹',
                gradient: 'from-red-400 to-pink-600',
                href: '/services',
              },
              {
                title: 'Aesthetic Services',
                description: 'Professional cosmetic and aesthetic procedures',
                icon: '✨',
                gradient: 'from-yellow-400 to-orange-600',
                href: '/services/aesthetics',
              },
              {
                title: 'General Surgery',
                description: 'Minor surgical procedures and consultations',
                icon: '🏥',
                gradient: 'from-green-400 to-green-600',
                href: '/services',
              },
              {
                title: 'Consultations',
                description: 'Expert medical consultations and treatment planning',
                icon: '👨‍⚕️',
                gradient: 'from-cyan-400 to-black',
                href: '/booking',
              },
            ].map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer overflow-hidden block"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Arrow Icon */}
                  <div className="mt-6 flex items-center text-black group-hover:text-white transition-colors duration-300">
                    <span className="font-semibold mr-2">Learn More</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gray-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/services" 
              className="inline-block bg-gradient-to-r from-black to-gray-500 text-white px-10 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-semibold text-lg transform hover:scale-105"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - 3D Cards */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-black font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Excellence in Vein Care
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Patient-centered care with a lounge-style medical environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Expert Specialist',
                description: 'Dr Sesing - experienced vein and aesthetic specialist',
                icon: '👨‍⚕️',
                color: 'blue',
              },
              {
                title: 'Medical Aid',
                description: 'All major medical aids accepted',
                icon: '💳',
                color: 'purple',
              },
              {
                title: 'Flexible Hours',
                description: 'Extended hours for working patients',
                icon: '🕐',
                color: 'pink',
              },
              {
                title: 'Walk-in/Walk-out',
                description: 'Minimally invasive procedures',
                icon: '🚶',
                color: 'green',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  
                  {/* Decorative Element */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-${feature.color}-100 rounded-full filter blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonials Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-black font-semibold text-sm uppercase tracking-wider">Patient Stories</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from real patients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
                name: 'Sarah M.',
                treatment: 'Varicose Vein Treatment',
                quote: 'The team at Venous Lounge made me feel comfortable throughout the entire process. My legs feel so much better now!',
                rating: 5,
              },
              {
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
                name: 'John D.',
                treatment: 'Spider Vein Removal',
                quote: 'Professional, efficient, and caring. The results exceeded my expectations. Highly recommend!',
                rating: 5,
              },
              {
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
                name: 'Linda K.',
                treatment: 'Aesthetic Services',
                quote: 'Dr Sesing is amazing! The clinic is modern and clean. I felt like I was in a luxury spa, not a medical facility.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                <div className="relative h-64">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl">{testimonial.name}</h3>
                    <p className="text-white/90 text-sm">{testimonial.treatment}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Before & After Gallery */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Treatment Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                  alt="Medical procedure"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h4 className="text-2xl font-bold mb-2">Advanced Procedures</h4>
                  <p className="text-white/90">State-of-the-art vein treatment technology</p>
                </div>
              </div>
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80"
                  alt="Happy patient"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h4 className="text-2xl font-bold mb-2">Patient Satisfaction</h4>
                  <p className="text-white/90">Transforming lives through quality care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
              🚀 Get Started Today
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
            Ready for Expert Vein Care?
          </h2>
          <p className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Book your consultation today. All major medical aids accepted. Flexible hours to suit your schedule.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="group relative bg-white text-black px-10 py-5 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-2xl transform hover:scale-105"
            >
              <span className="relative z-10">Book Your Appointment Now</span>
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-semibold text-lg transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-float" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full opacity-10 animate-float animation-delay-2000" />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-white rounded-full opacity-10 animate-float animation-delay-4000" />
      </section>
    </div>
  );
}
