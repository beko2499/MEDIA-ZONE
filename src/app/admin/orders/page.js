"use client";

import { useState, useEffect } from "react";
import styles from './admin.module.css';
import OrderSummary from '@/components/Admin/OrderSummary';
import OrderTable from '@/components/Admin/OrderTable';
import OrderDrawer from '@/components/Admin/OrderDrawer';
import { useLanguage } from "@/context/LanguageContext";

export default function AdminOrders() {
    const { t } = useLanguage();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/orders', { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch orders');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            // Optimistic update
            const updatedOrders = orders.map(o =>
                o.id === orderId ? { ...o, status: newStatus } : o
            );
            setOrders(updatedOrders);

            if (selectedOrder?.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }

            const res = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!res.ok) throw new Error('Failed to update status');

            // Re-fetch to ensure sync
            fetchOrders();
        } catch (error) {
            console.error("Error updating status:", error);
            fetchOrders(); // Revert on error
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('admin.orders.title')}</h1>
                <p className={styles.subtitle}>{t('admin.orders.subtitle')}</p>
            </div>

            {loading ? (
                <div style={{ color: '#fff', textAlign: 'center', padding: '4rem' }}>{t('admin.orders.loading')}</div>
            ) : (
                <>
                    <OrderSummary orders={orders} />
                    <OrderTable
                        orders={orders}
                        onViewClick={setSelectedOrder}
                    />
                </>
            )}

            {selectedOrder && (
                <OrderDrawer
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
}

