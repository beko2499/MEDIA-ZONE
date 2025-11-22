import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import Toast from '@/components/Toast/Toast';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
// import AnnouncementBar from '@/components/AnnouncementBar/AnnouncementBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Media Zone - Your Gateway to Entertainment',
    template: '%s | Media Zone'
  },
  description: 'Shop games, movies, anime, tech products, and accessories in Sudan. Located in Souq Al-Kalakla Al-Laffa, Khartoum. Free delivery on orders over 100,000 SDG.',
  keywords: ['games', 'movies', 'anime', 'tech', 'Sudan', 'Khartoum', 'electronics', 'entertainment'],
  authors: [{ name: 'Media Zone' }],
  creator: 'Media Zone',
  publisher: 'Media Zone',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Media Zone - Your Gateway to Entertainment',
    description: 'Shop games, movies, anime, and tech in Sudan',
    url: 'https://www.mediazonestore.com',
    siteName: 'Media Zone',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Zone - Your Gateway to Entertainment',
    description: 'Shop games, movies, anime, and tech in Sudan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <CartProvider>
            <ToastProvider>
              {/* <AnnouncementBar /> */}
              <Navbar />
              {children}
              <Footer />
              <Toast />
              <ScrollToTop />
            </ToastProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
