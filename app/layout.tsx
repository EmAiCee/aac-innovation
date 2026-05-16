import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AAC Innovations | Digital Excellence for Your Business',
  description: 'Professional website design, company registration, branding, social media management, and digital marketing services.',
  keywords: 'web design, company registration, branding, digital marketing, social media management',
  authors: [{ name: 'AAC Innovations' }],
  openGraph: {
    title: 'AAC Innovations - Digital Solutions',
    description: 'Transform your business with our professional digital services',
    url: 'https://aacinnovations.com',
    siteName: 'AAC Innovations',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AAC Innovations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}