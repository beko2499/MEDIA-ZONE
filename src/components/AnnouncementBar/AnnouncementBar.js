"use client";

import styles from './AnnouncementBar.module.css';
import { useLanguage } from '@/context/LanguageContext';

const AnnouncementBar = () => {
    const { language } = useLanguage();

    const announcements = {
        en: "🎉 Free delivery on orders over 100,000 SDG! | Shop now and save!",
        ar: "🎉 توصيل مجاني للطلبات التي تزيد عن 100,000 جنيه! | تسوق الآن ووفر!"
    };

    return (
        <div className={styles.announcementBar}>
            <div className={styles.content}>
                {announcements[language]}
            </div>
        </div>
    );
};

export default AnnouncementBar;
