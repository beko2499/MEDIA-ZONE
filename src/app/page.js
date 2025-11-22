"use client";

import Hero from "@/components/Hero/Hero";
import styles from "./page.module.css";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const categories = [
    { name: t('nav.games'), image: '/games.jpg' },
    { name: t('nav.movies'), image: '/movies.jpg' },
    { name: t('nav.anime'), image: '/anime.jpg' },
    { name: t('nav.tech'), image: '/tech.jpg' },
    { name: 'Accessories', image: '/accessories.jpg' },
    { name: 'Software', image: '/softwor.jpg' },
  ];

  return (
    <main className={`${styles.main} logo-background`}>
      <Hero />

      <section className={styles.categories}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('home.featuredCategories')} <span>{t('home.categoriesSpan')}</span></h2>
          <div className={styles.grid}>
            {categories.map((cat, index) => (
              <Link href={`/shop?category=${cat.name.toLowerCase()}`} key={index} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={cat.image} alt={cat.name} className={styles.cardImage} />
                </div>
                <div className={styles.cardContent}>
                  <h3>{cat.name}</h3>
                  <span className={styles.explore}>{t('home.explore')} &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
