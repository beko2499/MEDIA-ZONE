"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import Cart from '../Cart/Cart';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { getCartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const cartCount = getCartCount();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            MEDIA<span>ZONE</span>
          </Link>

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder={t('nav.searchPlaceholder')}
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className={styles.navLinks}>
            <Link href="/shop?category=games" className={styles.link}>{t('nav.games')}</Link>
            <Link href="/shop?category=movies" className={styles.link}>{t('nav.movies')}</Link>
            <Link href="/shop?category=anime" className={styles.link}>{t('nav.anime')}</Link>
            <Link href="/shop?category=tech" className={styles.link}>{t('nav.tech')}</Link>
          </div>

          <div className={styles.actions}>
            <button className={styles.langBtn} onClick={toggleLanguage}>
              {language === 'en' ? 'AR' : 'EN'}
            </button>
            <button className={styles.iconBtn} aria-label="Search" onClick={() => router.push(`/shop?search=${encodeURIComponent(searchQuery)}`)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button className={styles.iconBtn} aria-label="Wishlist" onClick={() => router.push('/wishlist')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <button className={styles.iconBtn} aria-label="Cart" onClick={() => setIsCartOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
            </button>
            <button className={styles.menuBtn} aria-label="Menu" onClick={handleMobileMenuToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileSearchBar}>
              <input
                type="text"
                placeholder={t('nav.searchPlaceholder')}
                className={styles.mobileSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
            <nav className={styles.mobileLinks}>
              <Link href="/" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</Link>
              <Link href="/shop?category=games" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.games')}</Link>
              <Link href="/shop?category=movies" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.movies')}</Link>
              <Link href="/shop?category=anime" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.anime')}</Link>
              <Link href="/shop?category=tech" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.tech')}</Link>
              <Link href="/about" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.about')}</Link>
              <Link href="/contact" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.contact')}</Link>
            </nav>
          </div>
        )}
      </nav>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
