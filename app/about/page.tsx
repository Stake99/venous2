'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            className="absolute top-40 right-10 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"
            style={{ transform: `translate(${-scrollY * 0.1}px, ${scrollY * 0.08}px)` }}
          />
          <div 
            className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"
            style={{ transform: `translate(${scrollY * 0.05}px, ${-scrollY * 0.1}px)` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-6">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              About <span className="text-black">The Venous Lounge</span>
            </h1>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ transform: `translateY(${scrollY * 0.15}px)` }}
            >
              Dr Sesing Surgery & Aesthetics - Specialising in vein and general surgical care with 
              a strong emphasis on patient safety, quality, and trust.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Mission & Vision - 3D Cards */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Clinic Images Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="relative h-72 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80"
                alt="Modern clinic reception"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">Modern Reception</h3>
                  <p className="text-white/90 text-sm">Welcoming lounge atmosphere</p>
                </div>
              </div>
            </div>
            <div className="relative h-72 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&q=80"
                alt="Private consultation rooms"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">Private Rooms</h3>
                  <p className="text-white/90 text-sm">Comfortable consultation spaces</p>
                </div>
              </div>
            </div>
            <div className="relative h-72 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80"
                alt="Advanced medical equipment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">Advanced Equipment</h3>
                  <p className="text-white/90 text-sm">Latest medical technology</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <span className="text-black font-semibold text-sm uppercase tracking-wider">Who We Are</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              The Venous Lounge - <span className="text-black">Dr Sesing Surgery & Aesthetics</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A Bloemfontein-based medical-aesthetic practice specialising in vein and general surgical care, 
              with a strong emphasis on patient safety and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {[
              {
                title: 'Your Health, our Priority Always',
                icon: '💙',
                gradient: 'from-gray-500 to-black',
                description: 'We prioritise medical-care standards over purely cosmetic or lifestyle-focused services. Our practice is built on trust, reliability, and clinical excellence.',
              },
              {
                title: 'All Major Medical Aids Accepted',
                icon: '💳',
                gradient: 'from-purple-500 to-black',
                description: 'We work with most South African medical-aid schemes, making quality vein and surgical treatment more accessible to insured patients and their families.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 200}ms both`,
                }}
              >
                <div className="relative bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      {item.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 group-hover:text-white mb-6 transition-colors duration-300">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 group-hover:text-white text-lg leading-relaxed transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gray-100 rounded-full filter blur-2xl opacity-50" />
                </div>
              </div>
            ))}
          </div>

          {/* Services and Expertise Section */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-12 shadow-xl">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Expertise</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Combining general surgical skills with specialized venous treatments to deliver 
                comprehensive, family-oriented care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🩺',
                  title: 'Vein Specialists',
                  description: 'Minimally invasive procedures for varicose and spider veins',
                },
                {
                  icon: '🏥',
                  title: 'General Surgery',
                  description: 'Broader surgical expertise for comprehensive patient care',
                },
                {
                  icon: '👨‍👩‍👧‍👦',
                  title: 'Family-Oriented',
                  description: 'Reliable services for you and your loved ones',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-md text-center transform hover:-translate-y-2 transition-all duration-300">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gray-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block mb-6">
                <span className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-semibold">
                  🏥 Our Practice
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                A Medically Grounded <span className="text-black">Approach</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  The Venous Lounge operates as both a clinical and comfort-oriented environment for vein 
                  and surgical treatments. Our "lounge" concept combines professional medical care with a 
                  welcoming atmosphere that puts patients at ease.
                </p>
                <p>
                  We focus on trust, reliability, and general-surgical expertise, rather than heavy marketing 
                  language or flashy aesthetics. This medically grounded image reflects our commitment to 
                  quality care above all else.
                </p>
                <p>
                  Our practice is designed for continuity of care - serving whole families and groups, not 
                  just individual patients. We build long-term relationships based on consistent, reliable 
                  medical service.
                </p>
              </div>
            </div>

            {/* Right Content - Key Features */}
            <div className="space-y-6">
              {[
                {
                  icon: '🏥',
                  title: 'Clinical Excellence',
                  description: 'Professional medical standards in a comfortable lounge setting',
                  color: 'blue',
                },
                {
                  icon: '👨‍⚕️',
                  title: 'General Surgical Foundation',
                  description: 'Broader surgical skills supporting specialized vein treatments',
                  color: 'purple',
                },
                {
                  icon: '💳',
                  title: 'Medical Aid Friendly',
                  description: 'Working with most South African medical-aid schemes',
                  color: 'green',
                },
                {
                  icon: '👨‍👩‍👧‍👦',
                  title: 'Family-Oriented Care',
                  description: 'Reliable services for you and your loved ones',
                  color: 'pink',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 150}ms both`,
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-5xl">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-black font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              The Principles That <span className="text-black">Guide Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Patient safety, trust, and quality care in everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Patient Safety',
                description: 'Medical-care standards prioritized over cosmetic trends',
                icon: '🛡️',
                gradient: 'from-gray-800 to-black',
              },
              {
                title: 'Trust & Reliability',
                description: 'Medically grounded approach, not flashy marketing',
                icon: '🤝',
                gradient: 'from-green-400 to-green-600',
              },
              {
                title: 'Quality Care',
                description: 'Clinical excellence in a comfortable lounge setting',
                icon: '⭐',
                gradient: 'from-purple-400 to-purple-600',
              },
              {
                title: 'Accessibility',
                description: 'Medical aid acceptance and family-oriented services',
                icon: '💳',
                gradient: 'from-pink-400 to-pink-600',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>

                  {/* Decorative Circle */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gray-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-black font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Meet Our <span className="text-black">Dedicated Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals committed to your health and well-being
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {[
              {
                name: 'Dr Mpho Sesing',
                role: 'General Practitioner',
                image: '/image/general_practitioner.jpg',
                description: 'Expert in general medicine and primary care. Dedicated to providing comprehensive healthcare services with a focus on patient wellness and preventive care.',
                specializations: [
                  'General Medicine',
                  'Primary Care',
                  'Preventive Healthcare',
                  'Patient Wellness',
                ],
                gradient: 'from-gray-800 to-black',
              },
              {
                name: 'Mrs Rebaone Kgware',
                role: 'Practice Manager',
                image: '/image/Practice_manager.jpg',
                description: 'Ensures smooth operations and exceptional patient experience. Coordinates all aspects of practice management to deliver quality care and service.',
                specializations: [
                  'Practice Operations',
                  'Patient Coordination',
                  'Medical Aid Liaison',
                  'Quality Assurance',
                ],
                gradient: 'from-purple-400 to-purple-600',
              },
            ].map((member, index) => (
              <Link
                key={index}
                href="/booking"
                className="group relative block"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 200}ms both`,
                }}
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Team Member Image */}
                      <div className="relative h-80 rounded-2xl overflow-hidden">
                        <Image
                          src={member.image}
                          alt={`${member.name} - ${member.role}`}
                          fill
                          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Team Member Info */}
                      <div className="text-center">
                        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-black group-hover:text-white font-medium mb-4 text-lg transition-colors duration-300">
                          {member.role}
                        </p>
                        <p className="text-gray-600 group-hover:text-white transition-colors duration-300 mb-6 leading-relaxed">
                          {member.description}
                        </p>

                        {/* Specializations */}
                        <div className="space-y-2 mb-6">
                          {member.specializations.map((spec, idx) => (
                            <div key={idx} className="flex items-center justify-center">
                              <svg className="w-5 h-5 text-black group-hover:text-white mr-2 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700 group-hover:text-white transition-colors duration-300">{spec}</span>
                            </div>
                          ))}
                        </div>

                        {/* Book Appointment Button */}
                        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="inline-block bg-white bg-opacity-20 text-white px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm">
                            Book Consultation →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
              </Link>
            ))}
          </div>

          {/* Credentials Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎓',
                title: 'Qualified Professionals',
                description: 'Extensive training and expertise',
              },
              {
                icon: '⭐',
                title: '15+ Years Experience',
                description: 'Proven track record of success',
              },
              {
                icon: '💙',
                title: 'Patient-Centered',
                description: 'Your health is our priority',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${(index + 1) * 150}ms both`,
                }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with 3D Effect */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose The Venous Lounge
            </h2>
            <p className="text-xl text-gray-100">
              Specialized care with a commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'Years Experience', icon: '⭐' },
              { number: '1000+', label: 'Successful Procedures', icon: '✅' },
              { number: '6 Days', label: 'Open Weekly', icon: '📅' },
              { number: 'All', label: 'Major Medical Aids', icon: '💳' },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 hover:bg-opacity-20 transition-all duration-300">
                  <div className="text-6xl mb-4">{stat.icon}</div>
                  <div className="text-5xl lg:text-6xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-100 font-medium text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
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
