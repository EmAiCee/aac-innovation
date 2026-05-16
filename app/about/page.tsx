'use client';

import { motion } from 'framer-motion';
import { Award, Users, Target, Heart } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every project we undertake.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with clients to achieve shared goals.'
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'We embrace cutting-edge technology and creative solutions.'
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We operate with transparency and ethical practices.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container-custom mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
            About <span className="gradient-text">AAC Innovations</span>
          </h1>
          <p className="text-text-light text-lg">
            We are a team of passionate digital experts dedicated to helping businesses grow through innovative solutions.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-to-r from-primary-navy to-primary-blue text-white py-20 mb-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 text-lg">
                To empower businesses with cutting-edge digital solutions that drive growth, enhance brand presence, and create lasting value in the digital economy.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-300 text-lg">
                To become Africa's leading digital innovation hub, recognized for transforming businesses and shaping the future of digital entrepreneurship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-navy mb-4">Our Core Values</h2>
          <p className="text-text-light">The principles that guide everything we do</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-2">{value.title}</h3>
              <p className="text-text-light">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}