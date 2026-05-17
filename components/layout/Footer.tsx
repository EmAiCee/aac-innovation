'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../shared/Logo';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/book', label: 'Book Consultation' },
];

const services = [
  'Website Design',
  'Company Registration',
  'Branding & Logo',
  'Social Media Management',
  'Digital Marketing',
];

export default function Footer() {
  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A192F] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            {/* Custom logo for footer (white text) */}
            <div className="flex items-center gap-2">
              <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="100" rx="20" fill="url(#footerGradient)" />
                <path
                  d="M30 70L50 30L70 70"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M40 55L50 40L60 55"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="50" cy="70" r="4" fill="white" />
                <defs>
                  <linearGradient id="footerGradient" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="#0066FF" />
                    <stop offset="100%" stopColor="#14B8A6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="font-bold text-xl text-white">
                AAC <span className="text-[#14B8A6]">Innovations</span>
              </div>
            </div>
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              Transforming businesses through innovative digital solutions. Your trusted partner in digital excellence.
            </p>
            <div className="flex space-x-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-full transition-all duration-300 hover:bg-[#1877f2] hover:scale-110"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-full transition-all duration-300 hover:bg-[#1da1f2] hover:scale-110"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-full transition-all duration-300 hover:bg-[#0077b5] hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-full transition-all duration-300 hover:bg-[#e4405f] hover:scale-110"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    onClick={link.href === '/#services' ? handleServicesClick : undefined}
                    className="text-gray-300 hover:text-[#14B8A6] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    href="/#services" 
                    onClick={handleServicesClick}
                    className="text-gray-300 hover:text-[#14B8A6] transition-colors duration-300"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 hover:text-[#14B8A6] transition-colors">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-[#14B8A6] transition-colors">
                <Mail size={18} />
                <span>hello@aacinnovations.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-[#14B8A6] transition-colors">
                <MapPin size={18} />
                <span>123 Digital Avenue, Tech City, TC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} AAC Innovations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}