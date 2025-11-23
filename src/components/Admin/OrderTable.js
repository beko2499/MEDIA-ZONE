import styles from '@/app/admin/orders/admin.module.css';
import { Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function OrderTable({ orders, onViewClick }) {
    const { t } = useLanguage();
    const getStatusClass = (status) => {
        switch (status) {
            case 'pending': return styles.badgePending;
            case 'confirmed': return styles.badgeConfirmed;
            case 'delivered': return styles.badgeDelivered;
            case 'completed': return styles.badgeCompleted;
            default: return styles.badgeCancelled;
        }
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{t('admin.orders.table.id')}</th>
                            <th>{t('admin.orders.table.customer')}</th>
                            <th>{t('admin.orders.table.items')}</th>
                            <th>{t('admin.orders.table.total')}</th>
                            <th>{t('admin.orders.table.date')}</th>
                            <th>{t('admin.orders.table.status')}</th>
                            <th>{t('admin.orders.table.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#a3a3a3' }}>
                                    {t('admin.orders.table.noOrders')}
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td style={{ fontFamily: 'monospace', color: '#a3a3a3' }} data-label={t('admin.orders.table.id')}>
                                        #{order.id.slice(0, 8)}
                                    </td>
                                    <td data-label={t('admin.orders.table.customer')}>
                                        <div style={{ fontWeight: 500 }}>{order.fullName || order.whatsappNumber}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#a3a3a3' }}>{order.phone}</div>
                                    </td>
                                    <td data-label={t('admin.orders.table.items')}>{order.items?.length || 0} {t('admin.orders.table.itemsCount')}</td>
                                    <td style={{ fontWeight: 700 }} data-label={t('admin.orders.table.total')}>{Number(order.total).toLocaleString()} SDG</td>
                                    <td style={{ color: '#a3a3a3', fontSize: '0.9rem' }} data-label={t('admin.orders.table.date')}>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td data-label={t('admin.orders.table.status')}>
                                        <span className={`${styles.badge} ${getStatusClass(order.status)}`}>
                                            {t(`admin.orders.status.${order.status}`)}
                                        </span>
                                    </td>
                                    <td data-label={t('admin.orders.table.actions')}>
                                        <button
                                            className={styles.viewBtn}
                                            onClick={() => onViewClick(order)}
                                        >
                                            <Eye size={16} /> {t('admin.orders.table.view')}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
