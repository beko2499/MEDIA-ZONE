"use client";

import Link from 'next/link';
import styles from './ProductCard.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

const ProductCard = ({ product }) => {
    const { language } = useLanguage();
    const { addToCart, isInCart } = useCart();
    const { success } = useToast();

    const formatCurrency = (amount) => {
        const formatted = amount.toLocaleString('en-US');
        return language === 'ar' ? `${formatted} جنيه` : `${formatted} SDG`;
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        success(
            language === 'ar'
                ? `تمت إضافة ${product.name} إلى السلة`
                : `${product.name} added to cart`,
            2500
        );
    };

    const inCart = isInCart(product.id);

    return (
        <div className={styles.card}>
            <Link href={`/product/${product.id}`} className={styles.imageContainer}>
                {product.image ? (
                    <img src={product.image} alt={product.name} className={styles.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div className={styles.imagePlaceholder}>{product.name}</div>
                )}
            </Link>

            <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                <Link href={`/product/${product.id}`}>
                    <h3 className={styles.title}>{product.name}</h3>
                </Link>
                <div className={styles.price}>{formatCurrency(product.price)}</div>
                <button
                    className={`${styles.addToCart} ${inCart ? styles.inCart : ''}`}
                    onClick={handleAddToCart}
                >
                    {inCart ? (language === 'ar' ? 'في السلة ✓' : 'In Cart ✓') : (language === 'ar' ? 'أضف إلى السلة' : 'Add to Cart')}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
