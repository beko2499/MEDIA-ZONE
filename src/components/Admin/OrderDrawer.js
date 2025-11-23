import styles from '@/app/admin/orders/admin.module.css';
import { X, MapPin, Phone, User, CreditCard } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function OrderDrawer({ order, onClose, onStatusChange }) {
    const { t } = useLanguage();
    if (!order) return null;

    return (
        <>
            <div className={styles.drawerOverlay} onClick={onClose}></div>
            <div className={styles.drawer}>
                <div className={styles.drawerHeader}>
                    <div>
                        <div className={styles.drawerTitle}>{t('admin.orders.drawer.title')}</div>
                        <div style={{ color: '#a3a3a3', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                            #{order.id}
                        </div>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.drawerContent}>
                    {/* Status Section */}
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>{t('admin.orders.drawer.updateStatus')}</div>
                        <select
                            className={styles.select}
                            value={order.status}
                            onChange={(e) => onStatusChange(order.id, e.target.value)}
                        >
                            <option value="pending">⏳ {t('admin.orders.status.pending')}</option>
                            <option value="confirmed">✅ {t('admin.orders.status.confirmed')}</option>
                            <option value="delivered">🚚 {t('admin.orders.status.delivered')}</option>
                            <option value="completed">🎉 {t('admin.orders.status.completed')}</option>
                            <option value="cancelled">❌ {t('admin.orders.status.cancelled')}</option>
                        </select>
                    </div>

                    {/* Customer Info */}
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>{t('admin.orders.drawer.customerInfo')}</div>
                        <div className={styles.infoCard}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}><User size={14} style={{ display: 'inline', marginRight: 4 }} /> {t('admin.orders.drawer.name')}</span>
                                <span className={styles.infoValue}>{order.fullName || 'N/A'}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}><Phone size={14} style={{ display: 'inline', marginRight: 4 }} /> {t('admin.orders.drawer.phone')}</span>
                                <span className={styles.infoValue}>{order.phone || order.whatsappNumber}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}><MapPin size={14} style={{ display: 'inline', marginRight: 4 }} /> {t('admin.orders.drawer.address')}</span>
                                <span className={styles.infoValue} style={{ textAlign: 'right', maxWidth: '60%' }}>{order.address || 'N/A'}</span>
                            </div>
                            {order.notes && (
                                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #262626' }}>
                                    <span className={styles.infoLabel}>{t('admin.orders.drawer.notes')}:</span>
                                    <p style={{ color: '#fff', marginTop: '0.5rem', fontSize: '0.9rem' }}>{order.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>{t('admin.orders.drawer.orderItems')}</div>
                        <div className={styles.infoCard}>
                            {order.items?.map((item, index) => (
                                <div key={index} className={styles.productItem}>
                                    <div>
                                        <div style={{ fontWeight: 500, color: '#fff' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#a3a3a3' }}>{t('admin.orders.drawer.qty')}: {item.qty}</div>
                                    </div>
                                    <div style={{ fontWeight: 600 }}>${(item.price * item.qty).toLocaleString()}</div>
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #262626' }}>
                                <span style={{ color: '#a3a3a3' }}>{t('admin.orders.drawer.totalAmount')}</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                                    ${Number(order.total).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>{t('admin.orders.drawer.paymentInfo')}</div>
                        <div className={styles.infoCard}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}><CreditCard size={14} style={{ display: 'inline', marginRight: 4 }} /> {t('admin.orders.drawer.method')}</span>
                                <span className={styles.infoValue}>{order.paymentMethod}</span>
                            </div>
                            {order.paymentProofImage && (
                                <div style={{ marginTop: '1rem' }}>
                                    <span className={styles.infoLabel}>{t('admin.orders.drawer.proof')}:</span>
                                    <a href={order.paymentProofImage} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={order.paymentProofImage}
                                            alt="Proof"
                                            className={styles.imagePreview}
                                        />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
