'use client';

import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
}

export default function Logo({ variant = 'dark' }: LogoProps) {
  // Use different logos for light/dark backgrounds if needed
  const logoSrc = variant === 'light' ? '/logo-white.png' : '/logo.png';
  
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full overflow-hidden bg-gradient-to-r from-primary-blue to-primary-teal p-0.5">
        <Image
          src={logoSrc}
          alt="AAC Innovations Logo"
          width={50}
          height={50}
          className="object-contain rounded-full"
          priority
        />
      </div>
      <div className={`font-bold text-xl ${variant === 'light' ? 'text-white' : 'text-primary-navy dark:text-white'}`}>
        AAC
        <span className="gradient-text"> Innovations</span>
      </div>
    </div>
  );
}