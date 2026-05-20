'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';

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
  const pathname = usePathname();
  
  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

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
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full overflow-hidden bg-gradient-to-r from-primary-blue to-primary-teal p-0.5">
                <Image
                  src="/logo-white.png"
                  alt="AAC Innovations Logo"
                  width={50}
                  height={50}
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              <div className="font-bold text-xl text-white">
                AAC
                <span className="text-[#14B8A6]"> Innovations</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transforming businesses through innovative digital solutions. Your trusted partner in digital excellence.
            </p>
            <div className="flex space-x-3 mt-6">
              {/* Facebook - Brand Color Always */}
              <a
                href="https://www.facebook.com/share/1CZy9PySSp/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877f2] p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:brightness-110"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              
              {/* Twitter - Brand Color Always */}
              <a
                href="https://x.com/aacinnovations?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1da1f2] p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:brightness-110"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              
              {/* TikTok - Brand Color Always */}
              <a
                href="https://www.tiktok.com/@aacinnovations?_r=1&_t=ZS-96SzbJARDF9"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#000000] p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#25f4ee] hover:[&_svg]:fill-black"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              
              {/* Instagram - Brand Color Always */}
              <a
                href="https://www.instagram.com/aacinovations?igsh=anc4b3AxcmJnbzRw&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-tr from-[#f09433] via-[#d62976] to-[#962fbf] p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:brightness-110"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
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
                <span>+2349017997743</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-[#14B8A6] transition-colors">
                <Mail size={18} />
                <span>aacinovations43@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-[#14B8A6] transition-colors">
                <MapPin size={18} />
                <span>Zone4, Abuja</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} AAC Innovations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}