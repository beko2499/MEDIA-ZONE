'use client';

import styles from './page.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
    const { t } = useLanguage();
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('about.title')} <span>{t('contact.us')}</span></h1>
                <p className={styles.subtitle}>{t('about.subtitle')}</p>
            </div>

            <div className={styles.section}>
                <div className={styles.imageContainer}>
                    <img src="/StoreImage.jpg" alt={t('about.storyTitle')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className={styles.content}>
                    <h2 className={styles.sectionTitle}>{t('about.storyTitle')}</h2>
                    <p>
                        {t('about.storyText1')}
                    </p>
                    <p>
                        {t('about.storyText2')}
                    </p>
                </div>
            </div>

            <div className={`${styles.section} ${styles.sectionReverse}`}>
                <div className={styles.imageContainer}>
                    <img src="/TeamMissionImage.jpg" alt={t('about.offerTitle')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className={styles.content}>
                    <h2 className={styles.sectionTitle}>{t('about.offerTitle')}</h2>
                    <p>
                        {t('about.offerText1')}
                    </p>
                    <p>
                        {t('about.offerText2')}
                    </p>
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.statsCard}>
                    <div className={styles.statsNumber}>5000+</div>
                    <div className={styles.statsLabel}>{t('about.happyCustomers')}</div>
                </div>
                <div className={styles.statsCard}>
                    <div className={styles.statsNumber}>10,000+</div>
                    <div className={styles.statsLabel}>{t('about.gamesMovies')}</div>
                </div>
                <div className={styles.statsCard}>
                    <div className={styles.statsNumber}>100%</div>
                    <div className={styles.statsLabel}>{t('about.satisfaction')}</div>
                </div>
            </div>
        </div>
    );
}
