import styles from '@/app/admin/orders/admin.module.css';
import { ShoppingCart, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function OrderSummary({ orders }) {
    const { t } = useLanguage();
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const completedOrders = orders.filter(o => o.status === 'delivered' || o.status === 'completed').length;
    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    const cards = [
        {
            label: t('admin.orders.summary.total'),
            value: totalOrders,
            icon: <ShoppingCart size={24} color="#60a5fa" />,
            bg: 'rgba(37, 99, 235, 0.1)'
        },
        {
            label: t('admin.orders.summary.pending'),
            value: pendingOrders,
            icon: <Clock size={24} color="#facc15" />,
            bg: 'rgba(234, 179, 8, 0.1)'
        },
        {
            label: t('admin.orders.summary.completed'),
            value: completedOrders,
            icon: <CheckCircle size={24} color="#4ade80" />,
            bg: 'rgba(22, 163, 74, 0.1)'
        },
        {
            label: t('admin.orders.summary.revenue'),
            value: `$${totalRevenue.toLocaleString()}`,
            icon: <DollarSign size={24} color="#f87171" />,
            bg: 'rgba(220, 38, 38, 0.1)'
        }
    ];

    return (
        <div className={styles.summaryGrid}>
            {cards.map((card, index) => (
                <div key={index} className={styles.summaryCard}>
                    <div className={styles.cardIcon} style={{ background: card.bg }}>
                        {card.icon}
                    </div>
                    <div className={styles.cardLabel}>{card.label}</div>
                    <div className={styles.cardValue}>{card.value}</div>
                </div>
            ))}
        </div>
    );
}
