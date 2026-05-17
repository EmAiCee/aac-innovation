'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle, Briefcase, Star, Users, Headphones } from 'lucide-react';

export default function Hero() {
  const handleExploreServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-navy via-primary-navy to-primary-blue">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-teal rounded-full blur-3xl animation-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-blue rounded-full blur-3xl animation-float [animation-delay:1000ms]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-blue/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-6">
              <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-teal rounded-full animate-pulse"></span>
                Trusted by 500+ Businesses
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Your Vision,{' '}
              <span className="gradient-text">Our Innovation</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Professional website design, company registration, branding, social media management, and digital marketing — all under one roof.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/book"
                className="bg-gradient-to-r from-primary-blue to-primary-teal text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 inline-flex items-center justify-center gap-2 group"
              >
                Book Free Consultation
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#services"
                onClick={handleExploreServices}
                className="border-2 border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
              >
                <Play size={18} />
                Explore Services
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {[
                { text: 'No Setup Fees', icon: CheckCircle },
                { text: 'Free Consultation', icon: CheckCircle },
                { text: '24/7 Support', icon: CheckCircle }
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <badge.icon size={16} className="text-primary-teal" />
                  <span className="text-sm">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { value: '500+', label: 'Projects Completed', icon: Briefcase, color: 'text-blue-400' },
              { value: '98%', label: 'Client Satisfaction', icon: Star, color: 'text-yellow-400' },
              { value: '50+', label: 'Expert Team', icon: Users, color: 'text-green-400' },
              { value: '24/7', label: 'Support Available', icon: Headphones, color: 'text-purple-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-default group"
              >
                <stat.icon 
                  size={40} 
                  className={`${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} 
                />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}