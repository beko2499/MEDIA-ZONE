"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";
import { useLanguage } from "./LanguageContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const { success, info } = useToast();
    const { language } = useLanguage();

    useEffect(() => {
        const storedWishlist = localStorage.getItem("wishlist");
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        if (wishlist.some((item) => item.id === product.id)) {
            info(language === "ar" ? "المنتج موجود بالفعل في المفضلة" : "Product already in wishlist");
            return;
        }
        setWishlist([...wishlist, product]);
        success(language === "ar" ? "تمت الإضافة للمفضلة" : "Added to wishlist");
    };

    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter((item) => item.id !== productId));
        info(language === "ar" ? "تم الحذف من المفضلة" : "Removed from wishlist");
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
