'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../shared/Logo';

const navLinks = [
  { href: '/', label: 'Home', isHash: false },
  { href: '/#services', label: 'Services', isHash: true, hashId: 'services' },
  { href: '/portfolio', label: 'Portfolio', isHash: false },
  { href: '/about', label: 'About', isHash: false },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Hide navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.isHash) {
      e.preventDefault();
      
      if (pathname === '/') {
        // Already on homepage, scroll to section
        const element = document.getElementById(link.hashId!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to homepage first, then scroll
        router.push('/');
        setTimeout(() => {
          const element = document.getElementById(link.hashId!);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md py-4">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="z-10 transition-all duration-300 hover:scale-105">
              <Logo />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link)}
                  className="font-medium text-text-dark dark:text-gray-200 transition-all duration-300 hover:text-primary-blue relative group"
                >
                  {link.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary-blue to-primary-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
              <Link
                href="/book"
                className="bg-gradient-to-r from-primary-blue to-primary-teal text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
              >
                <Calendar size={18} />
                Book Consultation
              </Link>
            </div>

            <button
              className="md:hidden z-10 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="text-text-dark dark:text-gray-200" size={24} />
              ) : (
                <Menu className="text-text-dark dark:text-gray-200" size={24} />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white dark:bg-gray-900 md:hidden pt-20"
          >
            <div className="container-custom flex flex-col space-y-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleClick(e, link);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-text-dark dark:text-gray-200 text-xl font-semibold py-3 border-b border-gray-100 dark:border-gray-800 hover:text-primary-blue transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book"
                className="bg-gradient-to-r from-primary-blue to-primary-teal text-white px-6 py-3 rounded-full font-semibold text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="h-20"></div>
    </>
  );
}