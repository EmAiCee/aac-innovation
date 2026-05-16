'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FolderOpen, 
  LogOut,
  Menu,
  X,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Admin navigation links (no Dashboard link since logo takes you there)
const adminLinks = [
  { href: '/admin/portfolio', label: 'Portfolio', icon: FolderOpen },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
];

export default function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState('Admin');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Get admin name from localStorage or fetch from API
    const getUserInfo = async () => {
      try {
        const res = await fetch('/api/auth/verify');
        const data = await res.json();
        if (data.valid && data.user) {
          setAdminName(data.user.name || 'Admin');
          localStorage.setItem('adminName', data.user.name || 'Admin');
        } else {
          const storedName = localStorage.getItem('adminName');
          if (storedName) setAdminName(storedName);
        }
      } catch (error) {
        const storedName = localStorage.getItem('adminName');
        if (storedName) setAdminName(storedName);
      }
    };
    
    getUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminName');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-primary-navy to-primary-blue shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo - takes you back to dashboard */}
            <Link href="/admin" prefetch={false} className="text-white font-bold text-xl">
              AAC <span className="text-primary-teal">Admin</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {adminLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <link.icon size={18} />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                );
              })}
              
              {/* Divider */}
              <div className="h-8 w-px bg-white/20 mx-3"></div>
              
              {/* Admin User Info & Logout */}
              <div className="flex items-center gap-3 ml-2">
                <div className="text-right">
                  <p className="text-white text-sm font-semibold">{adminName}</p>
                  <p className="text-white/60 text-xs">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary-navy md:hidden pt-16"
          >
            <div className="container-custom flex flex-col space-y-2 mt-8">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-white/20 my-4"></div>
              
              <div className="px-4 py-3">
                <p className="text-white font-semibold">{adminName}</p>
                <p className="text-white/60 text-sm">Administrator</p>
              </div>
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}