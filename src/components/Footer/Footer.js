"use client";

import Link from 'next/link';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
    const { t, language } = useLanguage();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* About Section */}
                    <div className={styles.section}>
                        <h3 className={styles.title}>{t('footer.aboutTitle')}</h3>
                        <p className={styles.text}>
                            {t('footer.aboutText')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.section}>
                        <h3 className={styles.title}>{t('footer.quickLinks')}</h3>
                        <ul className={styles.links}>
                            <li><Link href="/">{t('nav.home')}</Link></li>
                            <li><Link href="/shop">{t('footer.shopAll')}</Link></li>
                            <li><Link href="/about">{t('nav.about')}</Link></li>
                            <li><Link href="/contact">{t('nav.contact')}</Link></li>
                            <li><Link href="/faq">{language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}</Link></li>
                            <li><Link href="/terms">{language === 'en' ? 'Terms & Conditions' : 'الشروط والأحكام'}</Link></li>
                            <li><Link href="/privacy">{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.section}>
                        <h3 className={styles.title}>{t('footer.contactTitle')}</h3>
                        <ul className={styles.contactInfo}>
                            <li>Souq Al-Kalakla Al-Laffa</li>
                            <li>Khartoum, Sudan</li>
                            <li>+249 123 456 789</li>
                        </ul>
                        <div className={styles.socials}>
                            {/* Placeholders for social icons */}
                            <div className={styles.socialIcon}>FB</div>
                            <div className={styles.socialIcon}>IG</div>
                            <div className={styles.socialIcon}>TW</div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} <span>Media Zone</span>. {t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
