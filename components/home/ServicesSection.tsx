'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const active = data.data.filter((s: any) => s.isActive === true);
          setServices(active);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
        <p className="mt-4 text-text-light">Loading services...</p>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section id="services" className="py-24 text-center">
        <p className="text-text-light">No services available. Please add services in admin panel.</p>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-primary-blue font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2">
            <Sparkles size={16} />
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mt-4 mb-4">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            We offer end-to-end digital services to help your business thrive
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any) => (
            <div key={service._id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-1 bg-gradient-to-r from-primary-blue to-primary-teal"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-light mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features?.map((feature: string, idx: number) => (
                    <span key={idx} className="text-xs bg-gray-100 text-text-dark px-3 py-1.5 rounded-full">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
                <Link 
                  href="/book" 
                  className="inline-flex items-center gap-2 text-primary-blue font-semibold group-hover:gap-3 transition-all"
                >
                  Get Started
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}