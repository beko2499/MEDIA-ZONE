"use client";

import Link from 'next/link';
import styles from './Breadcrumb.module.css';
import { useLanguage } from '@/context/LanguageContext';

const Breadcrumb = ({ items }) => {
    const { t } = useLanguage();

    return (
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.list}>
                <li className={styles.item}>
                    <Link href="/" className={styles.link}>
                        {t('nav.home')}
                    </Link>
                    <span className={styles.separator}>/</span>
                </li>
                {items.map((item, index) => (
                    <li key={index} className={styles.item}>
                        {index === items.length - 1 ? (
                            <span className={styles.current} aria-current="page">{item.label}</span>
                        ) : (
                            <>
                                <Link href={item.href} className={styles.link}>
                                    {item.label}
                                </Link>
                                <span className={styles.separator}>/</span>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
