'use client';

import { use, useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useLanguage } from '@/context/LanguageContext';

export default function Shop({ searchParams: searchParamsPromise }) {
    const { t } = useLanguage();
    const searchParams = use(searchParamsPromise);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (!res.ok) throw new Error('Failed to fetch products');
                const data = await res.json();

                // Map data if necessary, though API returns compatible structure
                const productsData = data.map(p => ({
                    ...p,
                    name: p.title, // Ensure compatibility with existing components using 'name'
                    image: p.imageUrl // Ensure compatibility with existing components using 'image'
                }));

                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    let filteredProducts = products;

    if (searchParams?.category) {
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === searchParams.category.toLowerCase());
    }

    if (searchParams?.search) {
        const query = searchParams.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>
                        {searchParams?.search ? `${t('shop.searchResults')} "${searchParams.search}"` : (searchParams?.category ? `${searchParams.category}` : `${t('shop.title')} ${t('shop.all')}`)}
                    </h1>
                </div>
            </div>

            <div className={styles.layout}>
                <aside className={styles.sidebar}>
                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>{t('shop.categories')}</h3>
                        <ul className={styles.filterList}>
                            {['Games', 'Movies', 'Anime', 'Tech', 'Accessories', 'Software'].map(cat => (
                                <li key={cat} className={styles.filterItem}>
                                    <Link href={`/shop?category=${cat.toLowerCase()}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                                        <input
                                            type="checkbox"
                                            className={styles.checkbox}
                                            checked={searchParams?.category?.toLowerCase() === cat.toLowerCase()}
                                            readOnly
                                        />
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>{t('shop.priceRange')}</h3>
                        <ul className={styles.filterList}>
                            <li className={styles.filterItem}>
                                <input type="checkbox" className={styles.checkbox} /> {t('shop.under50')}
                            </li>
                            <li className={styles.filterItem}>
                                <input type="checkbox" className={styles.checkbox} /> {t('shop.50to100')}
                            </li>
                            <li className={styles.filterItem}>
                                <input type="checkbox" className={styles.checkbox} /> {t('shop.100plus')}
                            </li>
                        </ul>
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>
                    ) : filteredProducts.length > 0 ? (
                        <div className={styles.grid}>
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                            {t('shop.noProducts')}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
