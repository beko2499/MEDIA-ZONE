'use client';

import styles from './page.module.css';

export default function Privacy() {
    return (
        <div className={`${styles.container} logo-background`}>
            <h1 className={styles.title}>Privacy <span>Policy</span></h1>
            <div className={styles.lastUpdated}>Last updated: January 2025</div>

            <section className={styles.section}>
                <h2>1. Information We Collect</h2>
                <p>We collect information that you provide directly to us, including:</p>
                <ul>
                    <li>Name and contact information (phone number, email address)</li>
                    <li>Delivery address</li>
                    <li>Payment information</li>
                    <li>Purchase history</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your purchases</li>
                    <li>Send promotional materials (with your consent)</li>
                    <li>Improve our products and services</li>
                    <li>Prevent fraud and maintain security</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>3. Information Sharing</h2>
                <p>We do not sell your personal information. We may share your information with:</p>
                <ul>
                    <li>Delivery partners to fulfill your orders</li>
                    <li>Payment processors to handle transactions</li>
                    <li>Law enforcement when required by law</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>4. Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section className={styles.section}>
                <h2>5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>6. Cookies</h2>
                <p>We use cookies to enhance your browsing experience and analyze website traffic. You can disable cookies in your browser settings.</p>
            </section>

            <section className={styles.section}>
                <h2>7. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.</p>
            </section>

            <section className={styles.section}>
                <h2>8. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us at:</p>
                <p><strong>Address:</strong> Souq Al-Kalakla Al-Laffa, Khartoum, Sudan</p>
                <p><strong>Phone:</strong> +249 123 456 789</p>
            </section>
        </div>
    );
}
