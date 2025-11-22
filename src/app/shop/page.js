'use client';

import { use } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useLanguage } from '@/context/LanguageContext';

// Mock Data
const products = [
    { id: 1, name: 'Elden Ring', category: 'Games', price: 36000, image: '/EldenRing.jpg' },
    { id: 2, name: 'God of War Ragnarok', category: 'Games', price: 42000 },
    { id: 3, name: 'MacBook Pro 16"', category: 'Tech', price: 1500000 },
    { id: 4, name: 'PS5 Controller', category: 'Accessories', price: 45000 },
    { id: 5, name: 'Attack on Titan Vol. 1', category: 'Anime', price: 12000 },
    { id: 6, name: 'Adobe Creative Cloud', category: 'Software', price: 36000 },
    { id: 7, name: 'Gaming Mouse', category: 'Accessories', price: 30000 },
    { id: 8, name: 'Mechanical Keyboard', category: 'Tech', price: 78000 },
];

export default function Shop({ searchParams: searchParamsPromise }) {
    const { t } = useLanguage();
    const searchParams = use(searchParamsPromise);

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
                            {['Games', 'Movies', 'Anime', 'Tech'].map(cat => (
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
                    {filteredProducts.length > 0 ? (
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
