'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import styles from './page.module.css';

export default function Checkout() {
    const router = useRouter();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { t, language } = useLanguage();
    const { success, error } = useToast();

    const [paymentMethod, setPaymentMethod] = useState('');
    const [receiptImage, setReceiptImage] = useState(null);
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            router.push('/shop');
        }
    }, [cartItems, router]);

    const formatCurrency = (amount) => {
        const formatted = amount.toLocaleString('en-US');
        return language === 'ar' ? `${formatted} جنيه` : `${formatted} SDG`;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                error(language === 'ar' ? 'يرجى تحميل صورة صالحة (PNG, JPG, WEBP)' : 'Please upload a valid image (PNG, JPG, WEBP)');
                e.target.value = '';
                setReceiptImage(null);
                return;
            }
            setReceiptImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!paymentMethod) {
            error(language === 'ar' ? 'يرجى اختيار طريقة الدفع' : 'Please select a payment method');
            return;
        }

        if (!receiptImage) {
            error(language === 'ar' ? 'يرجى إرفاق إيصال الدفع' : 'Please upload the payment receipt');
            return;
        }

        if (!whatsappNumber || !/^\d+$/.test(whatsappNumber)) {
            error(language === 'ar' ? 'يرجى إدخال رقم واتساب صحيح' : 'Please enter a valid WhatsApp number');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success
        success(language === 'ar' ? '✔ تم إرسال طلبك بنجاح!' : '✔ Your order has been submitted successfully!');

        // Clear cart and redirect
        clearCart();
        router.push('/');
    };

    if (cartItems.length === 0) {
        return null; // Or a loading spinner while redirecting
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {language === 'ar' ? 'إتمام الشراء' : 'Checkout'}
            </h1>

            <div className={styles.layout}>
                {/* Payment & Info Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        {language === 'ar' ? 'معلومات الدفع' : 'Payment Information'}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {/* Payment Methods */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                {language === 'ar' ? 'اختر طريقة الدفع' : 'Choose Payment Method'}
                            </label>
                            <div className={styles.paymentMethods}>
                                {['Bankak (بنكك)', 'Fawry (فوري)', 'Sahal (ساهل)'].map((method) => (
                                    <label
                                        key={method}
                                        className={`${styles.paymentOption} ${paymentMethod === method ? styles.selected : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method}
                                            checked={paymentMethod === method}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className={styles.radio}
                                        />
                                        <span>{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Receipt Upload - Only show if payment method selected */}
                        {paymentMethod && (
                            <div className={`${styles.formGroup} ${styles.uploadSection}`}>
                                <label className={styles.label}>
                                    {language === 'ar' ? 'إرفاق إثبات الدفع' : 'Upload Payment Receipt'}
                                </label>
                                <input
                                    type="file"
                                    id="receipt"
                                    accept=".png,.jpg,.jpeg,.webp"
                                    onChange={handleFileChange}
                                    className={styles.fileInput}
                                />
                                <label htmlFor="receipt" className={styles.uploadLabel}>
                                    {language === 'ar' ? 'اختر ملف' : 'Choose File'}
                                </label>
                                {receiptImage && (
                                    <span className={styles.fileName}>{receiptImage.name}</span>
                                )}
                            </div>
                        )}

                        {/* WhatsApp Number */}
                        <div className={styles.formGroup}>
                            <label htmlFor="whatsapp" className={styles.label}>
                                {language === 'ar' ? 'ادخل رقم الواتساب' : 'Enter your WhatsApp number'}
                            </label>
                            <input
                                type="tel"
                                id="whatsapp"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                                placeholder="0912345678"
                                className={styles.input}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? (language === 'ar' ? 'جاري المعالجة...' : 'Processing...')
                                : (language === 'ar' ? 'تأكيد الطلب' : 'Confirm Order')}
                        </button>
                    </form>
                </div>

                {/* Order Summary Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        {language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
                    </h2>

                    <div className={styles.orderItems}>
                        {cartItems.map((item) => (
                            <div key={item.id} className={styles.orderItem}>
                                <div className={styles.itemInfo}>
                                    <h4>{item.name}</h4>
                                    <span className={styles.itemQuantity}>x{item.quantity}</span>
                                </div>
                                <div className={styles.itemPrice}>
                                    {formatCurrency(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.totalRow}>
                        <span>{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                        <span className={styles.totalAmount}>{formatCurrency(getCartTotal())}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
