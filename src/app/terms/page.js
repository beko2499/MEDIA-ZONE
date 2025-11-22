'use client';

import styles from './page.module.css';

export default function Terms() {
    return (
        <div className={`${styles.container} logo-background`}>
            <h1 className={styles.title}>Terms <span>&</span> Conditions</h1>
            <div className={styles.lastUpdated}>Last updated: January 2025</div>

            <section className={styles.section}>
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using Media Zone's website and services, you accept and agree to be bound by the terms and provisions of this agreement.</p>
            </section>

            <section className={styles.section}>
                <h2>2. Products and Services</h2>
                <p>Media Zone offers games, movies, series, anime, courses, computer applications, software, laptops, and phone/computer accessories. All product descriptions, images, and prices are subject to change without notice.</p>
            </section>

            <section className={styles.section}>
                <h2>3. Pricing and Payment</h2>
                <p>All prices are listed in Sudanese Pounds (SDG). We accept:</p>
                <ul>
                    <li>Cash on delivery</li>
                    <li>Bank transfers</li>
                    <li>Mobile money payments</li>
                </ul>
                <p>Prices may change without prior notice. The price charged will be the price displayed at the time of purchase.</p>
            </section>

            <section className={styles.section}>
                <h2>4. Delivery</h2>
                <p>We deliver to all safe states and regions in Sudan. Delivery times may vary based on location. Free delivery is offered on orders over 100,000 SDG.</p>
            </section>

            <section className={styles.section}>
                <h2>5. Returns and Refunds</h2>
                <p>Products may be returned within 7 days of purchase if:</p>
                <ul>
                    <li>The product is unopened and in its original condition</li>
                    <li>The product is defective or damaged upon receipt</li>
                    <li>You have the original receipt</li>
                </ul>
                <p>Refunds will be processed within 7-14 business days.</p>
            </section>

            <section className={styles.section}>
                <h2>6. Intellectual Property</h2>
                <p>All content on this website, including text, images, logos, and graphics, is the property of Media Zone and is protected by copyright laws.</p>
            </section>

            <section className={styles.section}>
                <h2>7. Limitation of Liability</h2>
                <p>Media Zone shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
            </section>

            <section className={styles.section}>
                <h2>8. Contact Information</h2>
                <p>For questions about these Terms & Conditions, please contact us at:</p>
                <p><strong>Address:</strong> Souq Al-Kalakla Al-Laffa, Khartoum, Sudan</p>
                <p><strong>Phone:</strong> +249 123 456 789</p>
            </section>
        </div>
    );
}
