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
  return (
    <footer className="bg-[#0A192F] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Logo variant="light" />
            <p className="mt-4 text-gray-300 text-sm">
              Transforming businesses through innovative digital solutions. Your trusted partner in digital excellence.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* Simple text links instead of icons */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#14B8A6] transition-colors">
                FB
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#14B8A6] transition-colors">
                TW
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#14B8A6] transition-colors">
                LN
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#14B8A6] transition-colors">
                IG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#14B8A6] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/#services" className="text-gray-300 hover:text-[#14B8A6] transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={18} />
                <span>hello@aacinnovations.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
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