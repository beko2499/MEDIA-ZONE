'use client';

import { use, useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

export default function ProductDetails({ params: paramsPromise }) {
    const { t, language } = useLanguage();
    const { addToCart, isInCart } = useCart();
    const { success } = useToast();
    const params = use(paramsPromise);
    const { id } = params;

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) {
                    if (res.status === 404) {
                        console.log("No such product!");
                        setProduct(null);
                    } else {
                        throw new Error('Failed to fetch product');
                    }
                    return;
                }

                const data = await res.json();
                const productData = { ...data, name: data.title }; // Map title to name
                setProduct(productData);
                if (productData.category) {
                    fetchRelatedProducts(productData.category, productData.id);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedProducts = async (category, currentId) => {
            try {
                // Fetch all products and filter (since we don't have a complex query API yet)
                // Ideally, the API should support filtering, but for local JSON this is fine
                const res = await fetch('/api/products');
                if (!res.ok) throw new Error('Failed to fetch related products');

                const allProducts = await res.json();
                const related = allProducts
                    .filter(p => p.category === category && p.id !== currentId)
                    .map(p => ({ ...p, name: p.title }))
                    .slice(0, 3);

                setRelatedProducts(related);
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const formatCurrency = (amount) => {
        if (!amount) return '';
        const formatted = amount.toLocaleString('en-US');
        return language === 'ar' ? `${formatted} جنيه` : `${formatted} SDG`;
    };

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product);
        success(
            language === 'ar'
                ? `تمت إضافة ${product.name} إلى السلة`
                : `${product.name} added to cart`,
            2500
        );
    };

    if (loading) return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
    if (!product) return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Product not found</div>;

    const inCart = isInCart(product.id);

    const breadcrumbItems = [
        { label: t('nav.shop'), href: '/shop' },
        { label: product.category, href: `/shop?category=${product.category.toLowerCase()}` },
        { label: product.name, href: `/product/${product.id}` }
    ];

    return (
        <>
            <div className={styles.container}>
                <div className="container">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <div className={styles.imageSection}>
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', borderRadius: '12px' }}>
                            {product.name} Image
                        </div>
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
                                    <div className={styles.relatedImage}>
                                        {relatedProduct.imageUrl ? (
                                            <img src={relatedProduct.imageUrl} alt={relatedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            relatedProduct.name
                                        )}
                                    </div>
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
