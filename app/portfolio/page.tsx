'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=400&fit=crop',
    description: 'Full-featured online store with payment integration'
  },
  {
    title: 'Corporate Branding',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop',
    description: 'Complete brand identity for a tech startup'
  },
  {
    title: 'Social Media Campaign',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop',
    description: 'Engaging campaign that increased engagement by 200%'
  },
  {
    title: 'Company Registration',
    category: 'Consulting',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop',
    description: 'Seamless business registration for multiple clients'
  }
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Explore some of our successful projects and see how we've helped businesses transform their digital presence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-64 bg-gray-200">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-6">
                  <Link href="/book" className="bg-white text-primary-navy px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gradient-to-r hover:from-primary-blue hover:to-primary-teal hover:text-white transition-all">
                    View Project <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <span className="text-primary-blue text-sm font-semibold">{project.category}</span>
                <h3 className="text-xl font-bold text-primary-navy mt-2 mb-2">{project.title}</h3>
                <p className="text-text-light">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}