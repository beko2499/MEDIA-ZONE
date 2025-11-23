"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './products.module.css';
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import { Trash2, Edit, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';

// Modal Component
const DeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
    if (!isOpen) return null;
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>Delete Product</h3>
                <p className={styles.modalText}>
                    Are you sure you want to delete <strong>{productName}</strong>?
                    <br />This action cannot be undone.
                </p>
                <div className={styles.modalActions}>
                    <button onClick={onClose} className={`${styles.modalBtn} ${styles.cancelBtn}`}>Cancel</button>
                    <button onClick={onConfirm} className={`${styles.modalBtn} ${styles.confirmDeleteBtn}`}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default function AdminProducts() {
    const router = useRouter();
    const { t } = useLanguage();
    const { success, error: toastError } = useToast();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Form State
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [stock, setStock] = useState("");
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    // Fetch products
    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products:", err);
            toastError("Failed to load products");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toastError("Please select a valid image file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toastError("Image size should be less than 5MB");
                return;
            }

            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = async () => {
        if (!image) {
            if (imageUrl) return imageUrl;
            throw new Error(t('admin.products.notifications.selectImage'));
        }

        const formData = new FormData();
        formData.append('file', image);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (!res.ok) throw new Error(t('admin.products.notifications.uploadError'));

        const data = await res.json();
        return data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !category.trim() || !price || !stock || !description.trim()) {
            toastError(t('admin.products.notifications.fillFields'));
            return;
        }

        if (!image && !imageUrl) {
            toastError(t('admin.products.notifications.selectImage'));
            return;
        }

        try {
            setUploading(true);

            let finalImageUrl = imageUrl;
            if (image) {
                finalImageUrl = await handleImageUpload();
            }

            const productData = {
                title: title.trim(),
                category: category.trim(),
                price: Number(price),
                description: description.trim(),
                imageUrl: finalImageUrl,
                stock: Number(stock)
            };

            let res;
            if (editingProduct) {
                res = await fetch(`/api/products/${editingProduct.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                });
            } else {
                res = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                });
            }

            if (!res.ok) throw new Error(t('admin.products.notifications.saveError'));

            success(editingProduct ? t('admin.products.notifications.updated') : t('admin.products.notifications.added'));
            resetForm();
            setShowForm(false);
            fetchProducts();
            router.refresh();
        } catch (err) {
            console.error("Submit error:", err);
            toastError(err.message || t('admin.products.notifications.saveError'));
        } finally {
            setUploading(false);
        }
    };

    const confirmDelete = (product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!productToDelete) return;

        try {
            const res = await fetch(`/api/products/${productToDelete.id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error(t('admin.products.notifications.deleteError'));

            success("Product deleted successfully.");
            setProducts(products.filter(p => p.id !== productToDelete.id)); // Optimistic update
            setDeleteModalOpen(false);
            setProductToDelete(null);
            router.refresh();
        } catch (err) {
            console.error("Delete error:", err);
            toastError(t('admin.products.notifications.deleteError'));
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setTitle(product.title);
        setCategory(product.category);
        setPrice(product.price.toString());
        setDescription(product.description);
        setImageUrl(product.imageUrl);
        setImagePreview(product.imageUrl);
        setStock(product.stock.toString());
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setTitle("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImage(null);
        setImageUrl("");
        setImagePreview("");
        setStock("");
        setEditingProduct(null);
    };

    return (
        <div className={styles.container}>
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                productName={productToDelete?.title}
            />

            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>{t('admin.products.title')}</h1>
                    <p className={styles.subtitle}>{products.length} {t('admin.products.subtitle')}</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className={`${styles.addButton} ${showForm ? styles.active : ''}`}
                >
                    {showForm ? <X size={20} /> : <Plus size={20} />}
                    {showForm ? t('admin.products.cancel') : t('admin.products.addProduct')}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        {editingProduct ? <Edit size={20} /> : <Plus size={20} />}
                        {editingProduct ? t('admin.products.editProduct') : t('admin.products.newProduct')}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.grid}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>{t('admin.products.form.title')}</label>
                                <input
                                    className={styles.input}
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder={t('admin.products.form.placeholderTitle')}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>{t('admin.products.form.category')}</label>
                                <select
                                    className={styles.input}
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    <option value="">{t('admin.products.form.placeholderCategory')}</option>
                                    <option value="Games">Games</option>
                                    <option value="Movies">Movies</option>
                                    <option value="Anime">Anime</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Software">Software</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>{t('admin.products.form.price')}</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    placeholder="0.00"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>{t('admin.products.form.stock')}</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('admin.products.form.description')}</label>
                            <textarea
                                className={`${styles.input} ${styles.textarea}`}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder={t('admin.products.form.placeholderDesc')}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('admin.products.form.image')}</label>
                            <div className={styles.imageUploadContainer}>
                                <div className={styles.previewArea}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className={styles.previewImage} />
                                    ) : (
                                        <div className={styles.placeholder}>
                                            <ImageIcon size={24} style={{ marginBottom: '5px', opacity: 0.5 }} />
                                            <br />
                                            {t('admin.products.form.noImage')}
                                        </div>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={styles.fileInput}
                                    />
                                    <p className={styles.helpText}>{t('admin.products.form.uploadHelp')}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="submit" disabled={uploading} className={styles.submitButton}>
                                {uploading ? <Upload size={18} className="animate-spin" /> : <Upload size={18} />}
                                {uploading ? t('admin.products.saving') : (editingProduct ? t('admin.products.update') : t('admin.products.save'))}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Product List */}
            <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHeadRow}>
                            <th className={styles.th}>{t('admin.products.table.image')}</th>
                            <th className={styles.th}>{t('admin.products.table.title')}</th>
                            <th className={styles.th}>{t('admin.products.table.category')}</th>
                            <th className={styles.th}>{t('admin.products.table.price')}</th>
                            <th className={styles.th}>{t('admin.products.table.stock')}</th>
                            <th className={styles.th}>{t('admin.products.table.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className={styles.tdCenter}>Loading products...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan="6" className={styles.tdCenter}>{t('admin.products.table.noProducts')}</td></tr>
                        ) : (
                            products.map(product => (
                                <tr key={product.id} className={styles.tableRow}>
                                    <td className={styles.td}>
                                        <img src={product.imageUrl} alt={product.title} className={styles.thumb} />
                                    </td>
                                    <td className={styles.td} data-label={t('admin.products.table.title')}>{product.title}</td>
                                    <td className={styles.td} data-label={t('admin.products.table.category')}><span className={styles.badge}>{product.category}</span></td>
                                    <td className={styles.td} data-label={t('admin.products.table.price')}>{product.price.toLocaleString()} SDG</td>
                                    <td className={styles.td} data-label={t('admin.products.table.stock')}>{product.stock}</td>
                                    <td className={styles.td} data-label={t('admin.products.table.actions')}>
                                        <button onClick={() => handleEdit(product)} className={styles.actionBtn} title="Edit">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => confirmDelete(product)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
