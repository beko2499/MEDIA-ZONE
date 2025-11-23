"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import styles from "../shop/page.module.css"; // Reuse shop styles

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { t, language } = useLanguage();

    const formatCurrency = (amount) => {
        const formatted = amount.toLocaleString("en-US");
        return language === "ar" ? `${formatted} جنيه` : `${formatted} SDG`;
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>{language === "ar" ? "المفضلة" : "Wishlist"}</h1>
                </div>
            </div>

            <div className="container" style={{ padding: "2rem 0" }}>
                {wishlist.length > 0 ? (
                    <div className={styles.grid}>
                        {wishlist.map((product) => (
                            <div key={product.id} className={styles.card}>
                                <Link href={`/product/${product.id}`}>
                                    <div className={styles.imageWrapper}>
                                        <img src={product.imageUrl || product.image} alt={product.name || product.title} className={styles.image} />
                                    </div>
                                </Link>
                                <div className={styles.content}>
                                    <div className={styles.category}>{product.category}</div>
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className={styles.productTitle}>{product.name || product.title}</h3>
                                    </Link>
                                    <div className={styles.price}>{formatCurrency(product.price)}</div>
                                    <div className={styles.actions}>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className={styles.addToCartBtn}
                                        >
                                            {t("product.addToCart")}
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className={styles.wishlistBtn}
                                            style={{ color: "red" }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: "center", padding: "4rem", color: "#888" }}>
                        {language === "ar" ? "المفضلة فارغة" : "Your wishlist is empty"}
                        <br />
                        <Link href="/shop" style={{ color: "red", textDecoration: "underline", marginTop: "1rem", display: "inline-block" }}>
                            {language === "ar" ? "تصفح المنتجات" : "Browse Products"}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
