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
                <span className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ Dr Sesing Surgery & Aesthetics
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Your Health, our
                <span className="block text-black">
                  Priority Always
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Expert vein treatment and aesthetic services in Bloemfontein, South Africa. 
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
              { number: 'Mon-Fri', label: '08:00 - 22:00', icon: '🕐' },
              { number: 'Saturday', label: '08:00 - 13:00', icon: '📅' },
              { number: 'Medical Aid', label: 'All Accepted', icon: '💳' },
              { number: 'Location', label: 'Bloemfontein', icon: '📍' },
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

      {/* Services Section with Parallax Cards */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gray-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-black font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Comprehensive Vein & Aesthetic Care
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Minimally invasive procedures with expert care
            </p>
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
