import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { Toaster } from 'react-hot-toast';

// ── NO next/font/google — avoids SSL certificate errors entirely ──
// System font stack covers all OS: Inter on macOS/iOS, Segoe UI on Windows,
// Roboto on Android — all look great, zero network calls needed.

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://finwise.ai'),
  title: {
    default: "FinWise AI — India's AI Financial Advisor",
    template: '%s | FinWise AI',
  },
  description:
    'AI-powered financial advisor for every Indian. FIRE planner, Tax Wizard (Form 16), MF Portfolio X-Ray, and 24×7 AI advisor in Hindi & English. Built by Sumit Kumar & Mehak Singhal, KIIT Bhubaneswar.',
  keywords: [
    'AI financial advisor India', 'FIRE planner India', 'tax wizard form 16',
    'mutual fund portfolio', 'SIP calculator', 'money health score',
    'financial planning app India', 'Hindi financial advisor', 'KIIT startup',
  ],
  authors: [
    { name: 'Sumit Kumar',   url: 'mailto:sumitranjanhisu@gmail.com' },
    { name: 'Mehak Singhal', url: 'mailto:singhalmehak04@gmail.com' },
  ],
  creator:   'Sumit Kumar & Mehak Singhal — KIIT University, Bhubaneswar',
  publisher: 'FinWise AI',
  openGraph: {
    type: 'website', locale: 'en_IN',
    url: 'https://finwise.ai', siteName: 'FinWise AI',
    title: "FinWise AI — India's AI Financial Advisor",
    description: 'The CA India never had. AI-powered financial planning at ₹499/month.',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'FinWise AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FinWise AI — India's AI Financial Advisor",
    description: 'The CA India never had. ₹499/month.',
    images: ['/logo.png'], creator: '@finwiseai',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: { icon: '/logo.png', apple: '/logo.png' },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#060a12' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  width: 'device-width', initialScale: 1, maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'FinWise AI',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web, iOS, Android',
              description: "India's AI-powered financial advisor built at KIIT University, Bhubaneswar.",
              url: 'https://finwise.ai',
              offers: { '@type': 'Offer', price: '499', priceCurrency: 'INR' },
              aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '1247' },
              author: [
                { '@type': 'Person', name: 'Sumit Kumar',   email: 'sumitranjanhisu@gmail.com',  affiliation: 'KIIT University, Bhubaneswar' },
                { '@type': 'Person', name: 'Mehak Singhal', email: 'singhalmehak04@gmail.com',   affiliation: 'KIIT University, Bhubaneswar' },
              ],
            }),
          }}
        />
        {/* Google Analytics — optional */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');` }} />
          </>
        )}
      </head>
      <body
        className="antialiased bg-[#060a12] text-slate-100"
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              },
              success: { iconTheme: { primary: '#10b981', secondary: '#f1f5f9' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#f1f5f9' } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
