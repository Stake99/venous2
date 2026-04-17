'use client';

import Link from 'next/link';
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
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
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
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                ✨ Our Story
              </span>
            </div>
            <h1 
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">MediCare Plus</span>
            </h1>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ transform: `translateY(${scrollY * 0.15}px)` }}
            >
              Committed to providing exceptional healthcare services with compassion, expertise, and innovation since 1999.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Mission & Vision - 3D Cards */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'Our Mission',
                icon: '🚀',
                gradient: 'from-blue-500 to-blue-600',
                description: 'To deliver world-class healthcare services that are accessible, affordable, and patient-centered. We strive to improve the health and well-being of our community through excellence in medical care, education, and research.',
              },
              {
                title: 'Our Vision',
                icon: '👁️',
                gradient: 'from-purple-500 to-blue-600',
                description: 'To be the leading healthcare provider recognized for clinical excellence, innovative treatments, and compassionate care. We envision a healthier future where quality healthcare is available to all.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 200}ms both`,
                }}
              >
                <div className="relative bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden">
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
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full filter blur-2xl opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block mb-6">
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                  📖 Our Journey
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                25 Years of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Excellence</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 1999, MediCare Plus began with a simple vision: to provide exceptional healthcare 
                  that puts patients first. What started as a small clinic with a handful of dedicated doctors 
                  has grown into a comprehensive medical center serving thousands of patients annually.
                </p>
                <p>
                  Over the past 25 years, we've expanded our services, invested in cutting-edge technology, 
                  and assembled a team of over 50 expert physicians and healthcare professionals. Our commitment 
                  to excellence has earned us recognition as one of the region's most trusted healthcare providers.
                </p>
                <p>
                  Today, we continue to innovate and evolve, embracing new technologies like online booking 
                  and telemedicine while maintaining the personal touch and compassionate care that has been 
                  our hallmark from the beginning.
                </p>
              </div>
            </div>

            {/* Right Content - Timeline */}
            <div className="relative">
              <div className="space-y-6">
                {[
                  { year: '1999', title: 'Founded', desc: 'Started as a small clinic', icon: '🏥', color: 'blue' },
                  { year: '2005', title: 'Expansion', desc: 'Grew to full medical center', icon: '📈', color: 'purple' },
                  { year: '2015', title: 'Innovation', desc: 'Introduced advanced diagnostics', icon: '🔬', color: 'green' },
                  { year: '2024', title: 'Leadership', desc: 'Leading healthcare provider', icon: '⭐', color: 'yellow' },
                ].map((milestone, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 150}ms both`,
                    }}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        {milestone.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.desc}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Decorative Element */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-${milestone.color}-100 rounded-full filter blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  </div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full filter blur-2xl opacity-20 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300 rounded-full filter blur-2xl opacity-20 animate-pulse animation-delay-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              The Principles That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Guide Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Excellence, compassion, and innovation in everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'Committed to the highest standards of medical care and service',
                icon: '🏆',
                gradient: 'from-yellow-400 to-orange-500',
              },
              {
                title: 'Compassion',
                description: 'Treating every patient with empathy, dignity, and respect',
                icon: '❤️',
                gradient: 'from-red-400 to-pink-500',
              },
              {
                title: 'Integrity',
                description: 'Upholding ethical practices and transparency in all we do',
                icon: '🛡️',
                gradient: 'from-blue-400 to-blue-600',
              },
              {
                title: 'Innovation',
                description: 'Embracing new technologies and treatment methods',
                icon: '💡',
                gradient: 'from-purple-400 to-purple-600',
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your health and well-being
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Chief Medical Officer',
                specialty: 'Internal Medicine',
                icon: '👩‍⚕️',
                gradient: 'from-blue-400 to-blue-600',
              },
              {
                name: 'Dr. Michael Chen',
                role: 'Director of Cardiology',
                specialty: 'Cardiovascular Medicine',
                icon: '👨‍⚕️',
                gradient: 'from-purple-400 to-purple-600',
              },
              {
                name: 'Dr. Emily Rodriguez',
                role: 'Head of Pediatrics',
                specialty: 'Pediatric Care',
                icon: '👩‍⚕️',
                gradient: 'from-pink-400 to-pink-600',
              },
            ].map((member, index) => (
              <Link
                key={index}
                href="/booking"
                className="group relative block"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 150}ms both`,
                }}
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-8xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {member.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 group-hover:text-white font-medium mb-2 transition-colors duration-300">
                      {member.role}
                    </p>
                    <p className="text-gray-600 group-hover:text-white transition-colors duration-300 mb-4">
                      {member.specialty}
                    </p>

                    {/* Book Appointment Button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Book Appointment →
                      </span>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with 3D Effect */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-blue-100">
              Making a difference in healthcare every day
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Expert Doctors', icon: '👨‍⚕️' },
              { number: '10k+', label: 'Happy Patients', icon: '😊' },
              { number: '25+', label: 'Years Experience', icon: '⭐' },
              { number: '15+', label: 'Departments', icon: '🏥' },
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
                  <div className="text-blue-100 font-medium text-lg">{stat.label}</div>
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
