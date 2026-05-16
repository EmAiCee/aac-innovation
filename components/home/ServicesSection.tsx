'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, FileText, Palette, Share2, Megaphone, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Globe,
    title: 'Professional Website Design',
    description: 'Custom, responsive websites that drive conversions and showcase your brand.',
    gradient: 'from-blue-500 to-cyan-500',
    price: 'Starting at $999',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading']
  },
  {
    icon: FileText,
    title: 'Company Registration',
    description: 'Hassle-free business registration with expert guidance throughout the process.',
    gradient: 'from-emerald-500 to-teal-500',
    price: 'Starting at $299',
    features: ['Business Structure', 'Document Prep', 'Compliance']
  },
  {
    icon: Palette,
    title: 'Branding & Logo Design',
    description: 'Memorable brand identities that tell your story and captivate your audience.',
    gradient: 'from-purple-500 to-pink-500',
    price: 'Starting at $499',
    features: ['Logo Creation', 'Color Strategy', 'Brand Guidelines']
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    description: 'Strategic content and engagement to grow your online community.',
    gradient: 'from-orange-500 to-red-500',
    price: 'Starting at $599/mo',
    features: ['Content Calendar', 'Engagement', 'Analytics']
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Data-driven campaigns that reach your target audience and drive growth.',
    gradient: 'from-indigo-500 to-violet-500',
    price: 'Starting at $799/mo',
    features: ['SEO/SEM', 'Email Marketing', 'PPC Campaigns']
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[#0066FF] font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2"
          >
            <Sparkles size={16} />
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A192F] dark:text-white mt-4 mb-6"
          >
            Comprehensive Digital Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[#94A3B8] dark:text-gray-300 text-lg"
          >
            We offer end-to-end digital services to help your business thrive in the modern world
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                <service.icon className="text-white" size={32} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0A192F] dark:text-white mb-3 group-hover:text-[#0066FF] transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#94A3B8] dark:text-gray-400 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Price */}
              <div className="mb-4">
                <span className="text-sm text-[#0066FF] font-semibold">{service.price}</span>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-[#1E293B] dark:text-gray-300 px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/book"
                className="inline-flex items-center gap-2 text-[#0066FF] font-semibold group-hover:gap-3 transition-all duration-300"
              >
                Get Started
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#14B8A6] text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}