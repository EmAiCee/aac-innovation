'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface PortfolioItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  clientName: string;
  year: string;
  results: string;
  image: string;
  featured: boolean;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-8 pb-20">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-navy dark:text-white mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-text-light dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Explore some of our successful projects and see how we've helped businesses transform their digital presence.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-light">No portfolio items yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-64 bg-gray-200 dark:bg-gray-700">
                  {project.image && project.image !== '/placeholder.jpg' ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-blue to-primary-teal">
                      <span className="text-white text-4xl">🎨</span>
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        ⭐ Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-primary-blue to-primary-teal text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Link
                      href="/book"
                      className="bg-white text-primary-navy px-6 py-2 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gradient-to-r hover:from-primary-blue hover:to-primary-teal hover:text-white"
                    >
                      Discuss This Project <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-navy dark:text-white mb-2 group-hover:text-primary-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-light dark:text-gray-400 mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  {/* Project Details with Clear Labels */}
                  <div className="space-y-2 mb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                    {project.clientName && (
                      <div className="flex items-start gap-2 text-sm">
                        <Users size={14} className="text-primary-blue mt-0.5 flex-shrink-0" />
                        <span className="text-text-dark dark:text-gray-300">
                          <span className="font-semibold">Client:</span> {project.clientName}
                        </span>
                      </div>
                    )}
                    {project.year && (
                      <div className="flex items-start gap-2 text-sm">
                        <Calendar size={14} className="text-primary-blue mt-0.5 flex-shrink-0" />
                        <span className="text-text-dark dark:text-gray-300">
                          <span className="font-semibold">Year:</span> {project.year}
                        </span>
                      </div>
                    )}
                    {project.results && (
                      <div className="flex items-start gap-2 text-sm">
                        <TrendingUp size={14} className="text-primary-teal mt-0.5 flex-shrink-0" />
                        <span className="text-text-dark dark:text-gray-300">
                          <span className="font-semibold">Result:</span> {project.results}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA Link */}
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 text-primary-blue font-semibold text-sm group-hover:gap-3 transition-all"
                  >
                    Get a similar project for your business
                    <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}