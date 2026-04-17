'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
            style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` }}
          />
          <div 
            className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"
            style={{ transform: `translate(${-scrollY * 0.1}px, ${scrollY * 0.08}px)` }}
          />
          <div 
            className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"
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
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ Welcome to Modern Healthcare
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Your Health is Our
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  Priority
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience world-class healthcare with our team of expert doctors and modern facilities. 
                Book your appointment online in just a few clicks.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/booking" 
                  className="group relative bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-2xl hover:scale-105 transform"
                >
                  <span className="relative z-10">Book Appointment</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link 
                  href="/services" 
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold text-center shadow-md hover:shadow-xl hover:scale-105 transform"
                >
                  Our Services
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { number: '50+', label: 'Expert Doctors' },
                  { number: '10k+', label: 'Happy Patients' },
                  { number: '25+', label: 'Years Experience' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - 3D Card */}
            <div 
              className="relative perspective-1000"
              style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
            >
              <div className="relative">
                {/* Floating Cards */}
                <div className="relative z-10 space-y-4">
                  {[
                    {
                      icon: '🏥',
                      title: '24/7 Emergency Care',
                      desc: 'Always here when you need us',
                      delay: 0,
                    },
                    {
                      icon: '👨‍⚕️',
                      title: 'Expert Doctors',
                      desc: 'Highly qualified specialists',
                      delay: 100,
                    },
                    {
                      icon: '📅',
                      title: 'Easy Booking',
                      desc: 'Schedule appointments online',
                      delay: 200,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 backdrop-blur-sm bg-opacity-90"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${item.delay}ms both`,
                        transform: `rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg) rotateX(${-(mousePosition.y - window.innerHeight / 2) * 0.01}deg)`,
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{item.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full filter blur-2xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300 rounded-full filter blur-2xl opacity-20 animate-pulse animation-delay-1000" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section with 3D Effect */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Expert Doctors', icon: '👨‍⚕️' },
              { number: '10k+', label: 'Happy Patients', icon: '😊' },
              { number: '25+', label: 'Years Experience', icon: '⭐' },
              { number: '15+', label: 'Departments', icon: '🏥' },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center transform hover:scale-110 transition-transform duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                <div className="text-5xl mb-2">{stat.icon}</div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Parallax Cards */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert medical care across multiple specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'General Medicine',
                description: 'Comprehensive primary care for all your health needs',
                icon: '🩺',
                gradient: 'from-blue-400 to-blue-600',
                href: '/services/general-medicine',
              },
              {
                title: 'Cardiology',
                description: 'Expert heart care and cardiovascular treatments',
                icon: '❤️',
                gradient: 'from-red-400 to-pink-600',
                href: '/services/cardiology',
              },
              {
                title: 'Pediatrics',
                description: 'Specialized care for infants, children, and adolescents',
                icon: '👶',
                gradient: 'from-purple-400 to-purple-600',
                href: '/services/pediatrics',
              },
              {
                title: 'Orthopedics',
                description: 'Treatment for bones, joints, and musculoskeletal issues',
                icon: '🦴',
                gradient: 'from-green-400 to-green-600',
                href: '/services',
              },
              {
                title: 'Dermatology',
                description: 'Skin, hair, and nail care by expert dermatologists',
                icon: '✨',
                gradient: 'from-yellow-400 to-orange-600',
                href: '/services',
              },
              {
                title: 'Laboratory',
                description: 'Advanced diagnostic testing and pathology services',
                icon: '🔬',
                gradient: 'from-cyan-400 to-blue-600',
                href: '/services',
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
                  <div className="mt-6 flex items-center text-blue-600 group-hover:text-white transition-colors duration-300">
                    <span className="font-semibold mr-2">Learn More</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/services" 
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-4 rounded-full hover:shadow-2xl transition-all duration-300 font-semibold text-lg transform hover:scale-105"
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
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Excellence in Healthcare
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide exceptional healthcare with a patient-first approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Experienced Team',
                description: 'Board-certified doctors with years of expertise',
                icon: '🎓',
                color: 'blue',
              },
              {
                title: 'Modern Facilities',
                description: 'State-of-the-art equipment and technology',
                icon: '🏢',
                color: 'purple',
              },
              {
                title: 'Patient Care',
                description: 'Compassionate and personalized treatment',
                icon: '💙',
                color: 'pink',
              },
              {
                title: 'Affordable Pricing',
                description: 'Quality healthcare at competitive rates',
                icon: '💰',
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800" />
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
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Book your appointment today and experience quality healthcare with our expert medical team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="group relative bg-white text-blue-600 px-10 py-5 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-2xl transform hover:scale-105"
            >
              <span className="relative z-10">Book Your Appointment Now</span>
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
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

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
