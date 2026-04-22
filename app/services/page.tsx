'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ServicesPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: 'Varicose Veins',
      description: 'Advanced minimally invasive treatment for varicose veins using walk-in, walk-out procedures with proven results.',
      features: [
        'Endovenous laser ablation',
        'Sclerotherapy injections',
        'Ambulatory phlebectomy',
        'Comprehensive vein evaluation',
      ],
      icon: '🦵',
      gradient: 'from-gray-800 to-black',
      href: '/services/varicose-veins',
    },
    {
      title: 'Spider Veins',
      description: 'Effective removal of spider and thread veins for clearer, healthier-looking skin using proven techniques.',
      features: [
        'Sclerotherapy treatment',
        'Laser vein removal',
        'Cosmetic vein therapy',
        'Quick recovery time',
      ],
      icon: '💉',
      gradient: 'from-purple-400 to-purple-600',
      href: '/services/spider-veins',
    },
    {
      title: 'Aesthetic Services',
      description: 'Professional cosmetic and aesthetic procedures to help you look and feel your best in a clinical setting.',
      features: [
        'Cosmetic consultations',
        'Non-surgical treatments',
        'Skin rejuvenation',
        'Professional aesthetic care',
      ],
      icon: '✨',
      gradient: 'from-pink-400 to-pink-600',
      href: '/services/aesthetics',
    },
    {
      title: 'Venous Ulcers',
      description: 'Specialized treatment for chronic venous ulcers and leg swelling with comprehensive wound care management.',
      features: [
        'Ulcer assessment and treatment',
        'Compression therapy',
        'Wound care management',
        'Preventive care planning',
      ],
      icon: '🩹',
      gradient: 'from-red-400 to-red-600',
      href: '/booking',
    },
    {
      title: 'General Surgery',
      description: 'Minor surgical procedures and consultations backed by general surgical expertise and experience.',
      features: [
        'Minor surgical procedures',
        'Surgical consultations',
        'Pre-operative assessments',
        'Post-operative care',
      ],
      icon: '🏥',
      gradient: 'from-green-400 to-green-600',
      href: '/booking',
    },
    {
      title: 'Vein Evaluations',
      description: 'Comprehensive vein health assessments using advanced diagnostic techniques to identify venous conditions.',
      features: [
        'Doppler ultrasound scanning',
        'Venous insufficiency testing',
        'Treatment planning',
        'Follow-up assessments',
      ],
      icon: '🔬',
      gradient: 'from-cyan-400 to-black',
      href: '/booking',
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
            style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` }}
          />
          <div 
            className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"
            style={{ transform: `translate(${-scrollY * 0.1}px, ${scrollY * 0.08}px)` }}
          />
          <div 
            className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"
            style={{ transform: `translate(${scrollY * 0.05}px, ${-scrollY * 0.1}px)` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="inline-block mb-6">
            <span className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-semibold">
              🩺 Our Services
            </span>
          </div>
          <h1 
            className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            Vein & Aesthetic <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-400">Specialists</span>
          </h1>
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            Expert vein treatment and aesthetic services delivered with medical excellence and patient care
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gray-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Featured Treatment Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80"
                alt="Vein treatment procedures"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-white font-bold text-3xl mb-2">Vein Treatments</h3>
                  <p className="text-white/90 text-lg">Advanced minimally invasive procedures</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80"
                alt="Aesthetic services"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-white font-bold text-3xl mb-2">Aesthetic Services</h3>
                  <p className="text-white/90 text-lg">Professional cosmetic treatments</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group relative block"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 50}ms both`,
                }}
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white mb-6 transition-colors duration-300">
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-black group-hover:text-white mr-2 mt-0.5 flex-shrink-0 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 group-hover:text-white text-sm transition-colors duration-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More Link */}
                    <div className="flex items-center text-black group-hover:text-white transition-colors duration-300">
                      <span className="font-semibold mr-2">Learn More</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Circle */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-black font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-400">Vein Care</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What sets The Venous Lounge apart
            </p>
          </div>

          {/* Facility Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80"
                alt="Modern clinic reception"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-bold text-lg">Modern Facilities</p>
              </div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&q=80"
                alt="Private consultation rooms"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-bold text-lg">Private Rooms</p>
              </div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80"
                alt="Advanced medical equipment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-bold text-lg">Advanced Equipment</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Vein Specialist',
                description: 'Expert in minimally invasive vein treatments',
                icon: '👨‍⚕️',
                gradient: 'from-gray-800 to-black',
              },
              {
                title: 'Medical Aid Accepted',
                description: 'All major South African medical aids',
                icon: '💳',
                gradient: 'from-green-400 to-green-600',
              },
              {
                title: 'Walk-in/Walk-out',
                description: 'Minimally invasive procedures',
                icon: '🚶',
                gradient: 'from-purple-400 to-purple-600',
              },
              {
                title: 'Lounge Setting',
                description: 'Clinical excellence in comfort',
                icon: '🛋️',
                gradient: 'from-pink-400 to-pink-600',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Dr Sesing Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Doctor Image */}
            <div className="relative" style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/image/venous.png"
                  alt="Dr Sesing - Vein & Aesthetic Specialist"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">15+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Dr Sesing</h3>
                  <p className="text-xl text-gray-100 mb-4">Vein & Aesthetic Specialist</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm">Expert Specialist</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">Board Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6" style={{ animation: 'fadeInUp 0.6s ease-out 200ms both' }}>
              <div className="inline-block">
                <span className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-semibold">
                  👨‍⚕️ Meet Your Specialist
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Expert Care from <span className="text-black">Dr Sesing</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                With over 15 years of experience in vein treatment and aesthetic procedures, Dr Sesing brings 
                expertise, compassion, and cutting-edge techniques to every patient consultation.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: 'Minimally Invasive Specialist',
                    desc: 'Expert in walk-in, walk-out vein procedures',
                    icon: '🩺',
                  },
                  {
                    title: 'Patient-Centered Approach',
                    desc: 'Your comfort and results are our priority',
                    icon: '💙',
                  },
                  {
                    title: 'Proven Track Record',
                    desc: '1000+ successful treatments performed',
                    icon: '⭐',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-gray-50 rounded-2xl p-4 hover:bg-gray-50 transition-colors duration-300">
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link 
                  href="/booking" 
                  className="inline-block bg-gradient-to-r from-black to-gray-500 text-white px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-semibold text-lg transform hover:scale-105"
                >
                  Book Consultation with Dr Sesing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-700 to-black" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
              📅 Book Now
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
            Ready to Schedule Your Appointment?
          </h2>
          <p className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Our team is here to provide you with the best medical care. Book your appointment today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="group relative bg-white text-black px-10 py-5 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-2xl transform hover:scale-105"
            >
              <span className="relative z-10">Book an Appointment</span>
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
