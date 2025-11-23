'use client';

import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastProvider } from '@/context/ToastContext';
import Toast from '@/components/Toast/Toast';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
// import AnnouncementBar from '@/components/AnnouncementBar/AnnouncementBar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Add admin-page class to body when on admin routes
  useEffect(() => {
    if (isAdminRoute) {
      document.body.classList.add('admin-page');
    } else {
      document.body.classList.remove('admin-page');
    }

    return () => {
      document.body.classList.remove('admin-page');
    };
  }, [isAdminRoute]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                {/* Only show Navbar and Footer for non-admin routes */}
                {!isAdminRoute && (
                  <>
                    {/* <AnnouncementBar /> */}
                    <Navbar />
                  </>
                )}
                {children}
                {!isAdminRoute && <Footer />}
                <Toast />
                <ScrollToTop />
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
