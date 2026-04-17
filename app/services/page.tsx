'use client';

import Link from 'next/link';
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
      title: 'General Medicine',
      description: 'Comprehensive primary care for all your health needs including routine check-ups, preventive care, and treatment of common illnesses.',
      features: [
        'Annual physical examinations',
        'Chronic disease management',
        'Preventive health screenings',
        'Vaccination services',
      ],
      icon: '🩺',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Cardiology',
      description: 'Expert heart care and cardiovascular treatments with state-of-the-art diagnostic equipment and experienced cardiologists.',
      features: [
        'ECG and stress testing',
        'Echocardiography',
        'Heart disease management',
        'Cardiac rehabilitation',
      ],
      icon: '❤️',
      gradient: 'from-red-400 to-pink-600',
    },
    {
      title: 'Pediatrics',
      description: 'Specialized care for infants, children, and adolescents in a friendly and comfortable environment.',
      features: [
        'Well-child visits',
        'Immunizations',
        'Growth and development monitoring',
        'Pediatric urgent care',
      ],
      icon: '👶',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Orthopedics',
      description: 'Treatment for bones, joints, and musculoskeletal issues with both surgical and non-surgical options.',
      features: [
        'Joint replacement surgery',
        'Sports medicine',
        'Fracture care',
        'Physical therapy',
      ],
      icon: '🦴',
      gradient: 'from-green-400 to-green-600',
    },
    {
      title: 'Dermatology',
      description: 'Comprehensive skin, hair, and nail care by board-certified dermatologists using the latest treatments.',
      features: [
        'Skin cancer screening',
        'Acne treatment',
        'Cosmetic procedures',
        'Hair loss treatment',
      ],
      icon: '✨',
      gradient: 'from-yellow-400 to-orange-600',
    },
    {
      title: 'Neurology',
      description: 'Expert diagnosis and treatment of nervous system disorders including brain, spinal cord, and nerve conditions.',
      features: [
        'Headache and migraine treatment',
        'Epilepsy management',
        'Stroke care',
        'Movement disorder treatment',
      ],
      icon: '🧠',
      gradient: 'from-indigo-400 to-indigo-600',
    },
    {
      title: 'Gynecology',
      description: 'Comprehensive women\'s health services including preventive care, pregnancy care, and treatment of gynecological conditions.',
      features: [
        'Annual wellness exams',
        'Prenatal and postnatal care',
        'Family planning',
        'Menopause management',
      ],
      icon: '🌸',
      gradient: 'from-pink-400 to-pink-600',
    },
    {
      title: 'Ophthalmology',
      description: 'Complete eye care services from routine exams to advanced surgical procedures for vision correction.',
      features: [
        'Comprehensive eye exams',
        'Cataract surgery',
        'LASIK consultation',
        'Glaucoma treatment',
      ],
      icon: '👁️',
      gradient: 'from-cyan-400 to-blue-600',
    },
    {
      title: 'Laboratory Services',
      description: 'Advanced diagnostic testing and pathology services with quick turnaround times and accurate results.',
      features: [
        'Blood tests',
        'Urinalysis',
        'Microbiology testing',
        'Pathology services',
      ],
      icon: '🔬',
      gradient: 'from-teal-400 to-teal-600',
    },
    {
      title: 'Radiology',
      description: 'State-of-the-art imaging services including X-rays, CT scans, MRI, and ultrasound for accurate diagnosis.',
      features: [
        'Digital X-rays',
        'CT and MRI scans',
        'Ultrasound imaging',
        'Mammography',
      ],
      icon: '📡',
      gradient: 'from-blue-400 to-cyan-600',
    },
    {
      title: 'Emergency Care',
      description: '24/7 emergency medical services with experienced staff ready to handle urgent medical situations.',
      features: [
        '24/7 availability',
        'Trauma care',
        'Emergency surgery',
        'Critical care unit',
      ],
      icon: '🚑',
      gradient: 'from-red-500 to-red-700',
    },
    {
      title: 'Physical Therapy',
      description: 'Rehabilitation services to help you recover from injuries, surgery, or manage chronic conditions.',
      features: [
        'Post-surgical rehabilitation',
        'Sports injury recovery',
        'Pain management',
        'Mobility improvement',
      ],
      icon: '💪',
      gradient: 'from-orange-400 to-orange-600',
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
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
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              🏥 Our Services
            </span>
          </div>
          <h1 
            className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-400">Healthcare</span>
          </h1>
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            Expert medical care across multiple specialties delivered by experienced professionals
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.title === 'General Medicine' ? '/services/general-medicine' : 
                      service.title === 'Cardiology' ? '/services/cardiology' :
                      service.title === 'Pediatrics' ? '/services/pediatrics' : '/booking'}
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
                          <svg className="w-5 h-5 text-blue-600 group-hover:text-white mr-2 mt-0.5 flex-shrink-0 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 group-hover:text-white text-sm transition-colors duration-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More Link */}
                    <div className="flex items-center text-blue-600 group-hover:text-white transition-colors duration-300">
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
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-400">Every Service</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What sets our medical services apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Expert Specialists',
                description: 'Board-certified doctors in every field',
                icon: '👨‍⚕️',
                gradient: 'from-blue-400 to-blue-600',
              },
              {
                title: 'Advanced Technology',
                description: 'State-of-the-art medical equipment',
                icon: '🔬',
                gradient: 'from-purple-400 to-purple-600',
              },
              {
                title: 'Personalized Care',
                description: 'Treatment plans tailored to you',
                icon: '💙',
                gradient: 'from-pink-400 to-pink-600',
              },
              {
                title: 'Quick Results',
                description: 'Fast diagnosis and treatment',
                icon: '⚡',
                gradient: 'from-yellow-400 to-orange-600',
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

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800" />
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
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Our team is here to provide you with the best medical care. Book your appointment today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="group relative bg-white text-blue-600 px-10 py-5 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-2xl transform hover:scale-105"
            >
              <span className="relative z-10">Book an Appointment</span>
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
    </div>
  );
}
