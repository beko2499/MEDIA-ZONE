"use client";

import Link from 'next/link';
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className={styles.hero}>
            <div className={styles.glow}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>{t('hero.title')}</h1>
                <p className={styles.tagline}>{t('hero.tagline')}</p>
                <div className={styles.ctaGroup}>
                    <Link href="/shop" className="btn btn-primary">
                        {t('hero.shopNow')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
