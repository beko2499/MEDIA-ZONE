"use client";

import { useRouter } from 'next/navigation';
import styles from './Cart.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

const Cart = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { t, language } = useLanguage();
    const { cartItems, removeFromCart, incrementQuantity, decrementQuantity, getCartTotal } = useCart();
    const { success } = useToast();

    // Format currency based on language
    const formatCurrency = (amount) => {
        const formatted = amount.toLocaleString('en-US');
        return language === 'ar' ? `${formatted} جنيه` : `${formatted} SDG`;
    };

    const handleRemoveItem = (item) => {
        removeFromCart(item.id);
        success(language === 'ar' ? `تم حذف ${item.name} من السلة` : `${item.name} removed from cart`);
    };

    const total = getCartTotal();

    return (
        <>
            {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
            <div className={`${styles.cart} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2>{t('cart.title')}</h2>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className={styles.items}>
                    {cartItems.length === 0 ? (
                        <p className={styles.empty}>{t('cart.empty')}</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemInfo}>
                                    <h4>{item.name}</h4>
                                    <p className={styles.itemCategory}>{item.category}</p>
                                    <p className={styles.itemPrice}>{formatCurrency(item.price)}</p>
                                </div>
                                <div className={styles.itemActions}>
                                    <div className={styles.quantityControl}>
                                        <button
                                            onClick={() => decrementQuantity(item.id)}
                                            className={styles.quantityBtn}
                                            aria-label="Decrease quantity"
                                        >
                                            −
                                        </button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button
                                            onClick={() => incrementQuantity(item.id)}
                                            className={styles.quantityBtn}
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item)}
                                        className={styles.removeBtn}
                                        aria-label="Remove item"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.total}>
                            <span>{t('cart.total')}:</span>
                            <span className={styles.totalAmount}>{formatCurrency(total)}</span>
                        </div>
                        <button
                            className={styles.checkoutBtn}
                            onClick={() => {
                                onClose();
                                router.push('/checkout');
                            }}
                        >
                            {t('cart.checkout')}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
