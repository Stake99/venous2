'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50">
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
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="inline-block mb-6">
            <span className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-semibold">
              💬 Get in Touch
            </span>
          </div>
          <h1 
            className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-400">Us</span>
          </h1>
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            Have questions? We're here to help. Reach out and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gray-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              {/* Clinic Image */}
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl mb-8 transform hover:scale-105 transition-all duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                  alt="Venous Lounge Medical Center"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-blue-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Visit Our Clinic</h3>
                  <p className="text-white/90">Modern facilities in Phahameng, Bloemfontein</p>
                </div>
              </div>
              
              <div className="inline-block mb-6">
                <span className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-semibold">
                  📍 Our Location
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-400">Connect</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: '📍',
                    title: 'Address',
                    content: '6571 Dr Lebona Street\nPhahameng\nBloemfontein\nSouth Africa',
                    gradient: 'from-gray-800 to-black',
                  },
                  {
                    icon: '📞',
                    title: 'Phone',
                    content: '+27 51 447 9589',
                    gradient: 'from-green-400 to-green-600',
                  },
                  {
                    icon: '✉️',
                    title: 'Email',
                    content: 'dr.sesingsurg@gmail.com',
                    gradient: 'from-purple-400 to-purple-600',
                  },
                  {
                    icon: '🕐',
                    title: 'Hours',
                    content: 'Monday - Friday: 08:00 AM - 10:00 PM\nSaturday - Sunday: 08:00 AM - 01:00 PM',
                    gradient: 'from-orange-400 to-orange-600',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group relative"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                    }}
                  >
                    <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-start space-x-4">
                        <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 group-hover:text-white whitespace-pre-line transition-colors duration-300">
                            {item.content}
                          </p>
                        </div>
                      </div>

                      {/* Decorative Element */}
                      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div 
                className="mt-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl h-64 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group"
                style={{
                  animation: 'fadeInUp 0.6s ease-out 400ms both',
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🗺️</div>
                  <p className="text-gray-500 font-semibold">Interactive Map Location</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 transform hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center mb-8">
                  <div className="text-4xl mr-4">📝</div>
                  <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                </div>
                
                {submitted && (
                  <div 
                    className="mb-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-4"
                    style={{ animation: 'fadeInUp 0.5s ease-out' }}
                  >
                    <div className="flex items-center">
                      <div className="text-4xl mr-3">✅</div>
                      <div>
                        <h3 className="text-green-800 font-bold">Message Sent!</h3>
                        <p className="text-green-700">We'll get back to you soon.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="appointment">Appointment Question</option>
                      <option value="billing">Billing Question</option>
                      <option value="medical">Medical Records</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full bg-gradient-to-r from-black to-purple-600 text-white px-8 py-5 rounded-full hover:from-gray-900 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105"
                  >
                    <span className="flex items-center justify-center">
                      Send Message
                      <svg className="w-6 h-6 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
