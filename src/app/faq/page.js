'use client';

import styles from './page.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

export default function FAQ() {
    const { language } = useLanguage();
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = {
        en: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept cash on delivery, bank transfers, and mobile money payments."
            },
            {
                question: "Do you offer delivery?",
                answer: "Yes! We deliver to all safe states/regions in Sudan. Delivery is free for orders over 100,000 SDG."
            },
            {
                question: "What are your operating hours?",
                answer: "We're open Saturday through Thursday from 8:00 AM to 6:00 PM. Closed on Fridays."
            },
            {
                question: "Can I return a product?",
                answer: "Yes, we accept returns within 7 days if the product is unopened and in original condition."
            },
            {
                question: "Where is your physical store located?",
                answer: "We're located in Souq Al-Kalakla Al-Laffa, next to Farmer's Commercial Bank, Khartoum, Sudan."
            }
        ],
        ar: [
            {
                question: "ما هي طرق الدفع المقبولة؟",
                answer: "نقبل الدفع عند الاستلام، التحويلات البنكية، والدفع عبر الهاتف المحمول."
            },
            {
                question: "هل تقدمون خدمة التوصيل؟",
                answer: "نعم! نوصل إلى جميع الولايات/المناطق الآمنة في السودان. التوصيل مجاني للطلبات التي تزيد عن 100,000 جنيه."
            },
            {
                question: "ما هي ساعات العمل؟",
                answer: "نحن مفتوحون من السبت إلى الخميس من الساعة 8:00 صباحًا حتى 6:00 مساءً. مغلق يوم الجمعة."
            },
            {
                question: "هل يمكنني إرجاع المنتج؟",
                answer: "نعم، نقبل الإرجاع خلال 7 أيام إذا كان المنتج غير مفتوح وفي حالته الأصلية."
            },
            {
                question: "أين يقع متجركم الفعلي؟",
                answer: "نحن موجودون في سوق الكلالكلة اللفة، بجوار بنك المزارع التجاري، الخرطوم، السودان."
            }
        ]
    };

    const currentFaqs = faqs[language];

    return (
        <div className={`${styles.container} logo-background`}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    {language === 'en' ? 'Frequently Asked' : 'الأسئلة'} <span>{language === 'en' ? 'Questions' : 'الشائعة'}</span>
                </h1>
                <p className={styles.subtitle}>
                    {language === 'en'
                        ? 'Find answers to common questions about our products and services'
                        : 'اعثر على إجابات للأسئلة الشائعة حول منتجاتنا وخدماتنا'}
                </p>
            </div>

            <div className={styles.faqList}>
                {currentFaqs.map((faq, index) => (
                    <div key={index} className={styles.faqItem}>
                        <button
                            className={`${styles.question} ${openIndex === index ? styles.active : ''}`}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <span>{faq.question}</span>
                            <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
                        </button>
                        {openIndex === index && (
                            <div className={styles.answer}>
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
