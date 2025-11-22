'use client';

import styles from './page.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('contact.title')} <span>{t('contact.us')}</span></h1>
                <p className={styles.subtitle}>{t('contact.subtitle')}</p>
            </div>

            <div className={styles.grid}>
                <div className={styles.infoCard}>
                    <h2 className={styles.sectionTitle}>{t('contact.infoTitle')}</h2>

                    <div className={styles.infoItem}>
                        <strong>{t('contact.addressLabel')}:</strong>
                        <p style={{ whiteSpace: 'pre-line' }}>
                            {t('contact.addressValue')}
                        </p>
                    </div>

                    <div className={styles.infoItem}>
                        <strong>{t('contact.phoneLabel')}:</strong>
                        <p>
                            General: +249 123 456 789<br />
                            Games: +249 987 654 321
                        </p>
                    </div>

                    <div className={styles.infoItem}>
                        <strong>{t('contact.hoursLabel')}:</strong>
                        <p style={{ whiteSpace: 'pre-line' }}>
                            {t('contact.hoursValue')}
                        </p>
                    </div>
                </div>

                <div className={styles.infoCard}>
                    <h2 className={styles.sectionTitle}>{t('contact.messageTitle')}</h2>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>{t('contact.nameLabel')}</label>
                            <input type="text" id="name" className={styles.input} placeholder={t('contact.namePlaceholder')} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>{t('contact.emailLabel')}</label>
                            <input type="email" id="email" className={styles.input} placeholder={t('contact.emailPlaceholder')} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>{t('contact.messageLabel')}</label>
                            <textarea id="message" className={styles.textarea} rows="5" placeholder={t('contact.messagePlaceholder')}></textarea>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            {t('contact.sendBtn')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
