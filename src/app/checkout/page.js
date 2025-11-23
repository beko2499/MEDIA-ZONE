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

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        notes: '',
        paymentMethod: '',
        whatsappNumber: '' // Kept for compatibility if needed, but 'phone' is primary now
    });

    const [receiptImage, setReceiptImage] = useState(null);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        if (!formData.fullName || !formData.phone || !formData.address || !formData.paymentMethod) {
            error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
            return;
        }

        if (!receiptImage) {
            error(language === 'ar' ? 'يرجى إرفاق إيصال الدفع' : 'Please upload the payment receipt');
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Upload Payment Proof
            const imageFormData = new FormData();
            imageFormData.append('file', receiptImage);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: imageFormData
            });

            if (!uploadRes.ok) throw new Error('Image upload failed');
            const { url: proofUrl } = await uploadRes.json();

            // 2. Create Order
            const total = getCartTotal();
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.id,
                    title: item.name || item.title,
                    price: item.price,
                    qty: item.quantity || 1
                })),
                total,
                ...formData,
                paymentProofImage: proofUrl,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            const orderRes = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (!orderRes.ok) throw new Error('Order submission failed');

            // 3. WhatsApp Redirection
            const productsList = cartItems.map(item => `- ${item.name} (x${item.quantity})`).join('\n');
            const whatsappMessage = `طلب جديد من موقع Media Zone:
الاسم: ${formData.fullName}
الهاتف: ${formData.phone}
العنوان: ${formData.address}

المنتجات:
${productsList}

السعر النهائي: ${formatCurrency(total)}
ملاحظة: ${formData.notes || 'لا يوجد'}

رابط الإثبات: ${window.location.origin}${proofUrl}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const adminPhone = '+249116134260';
            const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;

            // 4. Success & Cleanup
            success(language === 'ar' ? '✔ تم إرسال طلبك بنجاح!' : '✔ Your order has been submitted successfully!');
            clearCart();

            // Redirect to WhatsApp
            window.location.href = whatsappUrl;

        } catch (err) {
            console.error("Order submission error:", err);
            error(language === 'ar' ? 'حدث خطأ أثناء إرسال الطلب' : 'Error submitting order');
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return null;
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
                        {language === 'ar' ? 'معلومات الطلب' : 'Order Information'}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {/* Personal Info */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{language === 'ar' ? 'العنوان' : 'Address'}</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className={styles.textarea}
                                required
                                rows={3}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{language === 'ar' ? 'ملاحظات (اختياري)' : 'Notes (Optional)'}</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                className={styles.textarea}
                                rows={2}
                            />
                        </div>

                        {/* Payment Methods */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                {language === 'ar' ? 'اختر طريقة الدفع' : 'Choose Payment Method'}
                            </label>
                            <div className={styles.paymentMethods}>
                                {['Bankak (بنكك)', 'Fawry (فوري)', 'Sahal (ساهل)'].map((method) => (
                                    <label
                                        key={method}
                                        className={`${styles.paymentOption} ${formData.paymentMethod === method ? styles.selected : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method}
                                            checked={formData.paymentMethod === method}
                                            onChange={handleInputChange}
                                            className={styles.radio}
                                        />
                                        <span>{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Receipt Upload */}
                        {formData.paymentMethod && (
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

