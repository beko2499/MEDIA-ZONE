'use client';

import { use } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

// Mock Data (In a real app, fetch based on ID)
const getProduct = (id) => {
    const products = [
        { id: 1, name: 'Elden Ring', category: 'Games', price: 36000, image: '/EldenRing.jpg', description: 'The Golden Order has been broken. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.' },
        { id: 2, name: 'God of War Ragnarok', category: 'Games', price: 42000, description: 'Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.' },
        { id: 3, name: 'MacBook Pro 16"', category: 'Tech', price: 1500000, description: 'The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros.' },
        // Add more mock data as needed to match Shop page
    ];
    return products.find(p => p.id === parseInt(id)) || products[0];
};

export default function ProductDetails({ params: paramsPromise }) {
    const { t, language } = useLanguage();
    const { addToCart, isInCart } = useCart();
    const { success } = useToast();
    const params = use(paramsPromise);
    const { id } = params;
    const product = getProduct(id);

    const formatCurrency = (amount) => {
        const formatted = amount.toLocaleString('en-US');
        return language === 'ar' ? `${formatted} جنيه` : `${formatted} SDG`;
    };

    const handleAddToCart = () => {
        addToCart(product);
        success(
            language === 'ar'
                ? `تمت إضافة ${product.name} إلى السلة`
                : `${product.name} added to cart`,
            2500
        );
    };

    const inCart = isInCart(product.id);

    const breadcrumbItems = [
        { label: t('nav.shop'), href: '/shop' },
        { label: product.category, href: `/shop?category=${product.category.toLowerCase()}` },
        { label: product.name, href: `/product/${product.id}` }
    ];

    // Get related products (same category, different id)
    const allProducts = [
        { id: 1, name: 'Elden Ring', category: 'Games', price: 36000 },
        { id: 2, name: 'God of War Ragnarok', category: 'Games', price: 42000 },
        { id: 3, name: 'MacBook Pro 16"', category: 'Tech', price: 1500000 },
        { id: 4, name: 'PS5 Controller', category: 'Accessories', price: 45000 },
        { id: 5, name: 'Attack on Titan Vol. 1', category: 'Anime', price: 12000 },
    ];

    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <>
            <div className={styles.container}>
                <div className="container">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <div className={styles.imageSection}>
                    {product.image ? (
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                    ) : (
                        product.name + ' Image'
                    )}
                </div>

                <div className={styles.detailsSection}>
                    <span className={styles.category}>{product.category}</span>
                    <h1 className={styles.title}>{product.name}</h1>
                    <div className={styles.price}>{formatCurrency(product.price)}</div>
                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.actions}>
                        <button
                            className={`${styles.addToCartBtn} ${inCart ? styles.inCart : ''}`}
                            onClick={handleAddToCart}
                        >
                            {inCart ? (language === 'ar' ? 'في السلة ✓' : 'In Cart ✓') : t('product.addToCart')}
                        </button>
                        <a
                            href={`https://wa.me/249123456789?text=I'm interested in ${product.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.whatsappBtn}
                        >
                            {t('product.orderWhatsapp')}
                        </a>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className={styles.relatedSection}>
                    <div className="container">
                        <h2 className={styles.relatedTitle}>
                            {language === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}
                        </h2>
                        <div className={styles.relatedGrid}>
                            {relatedProducts.map((relatedProduct) => (
                                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`} className={styles.relatedCard}>
                                    <div className={styles.relatedImage}>{relatedProduct.name}</div>
                                    <div className={styles.relatedInfo}>
                                        <h3>{relatedProduct.name}</h3>
                                        <p className={styles.relatedPrice}>{formatCurrency(relatedProduct.price)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
