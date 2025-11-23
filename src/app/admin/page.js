"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminDashboard() {
    const { t } = useLanguage();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Fetch products
            const productsRes = await fetch('/api/products', { cache: 'no-store' });
            const products = await productsRes.json();
            const totalProducts = products.length || 0;

            // Fetch orders
            const ordersRes = await fetch('/api/orders', { cache: 'no-store' });
            const orders = await ordersRes.json();
            const totalOrders = orders.length || 0;

            // Count pending orders
            const pendingOrders = orders.filter(order => order.status === "pending").length;

            // Calculate total revenue
            const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);

            setStats({
                totalProducts,
                totalOrders,
                pendingOrders,
                totalRevenue,
            });
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const statsCards = [
        {
            title: t('admin.dashboard.totalProducts'),
            value: stats.totalProducts,
            icon: "📦",
            gradient: "linear-gradient(to bottom right, #2563eb, #1e40af)",
            link: "/admin/products",
        },
        {
            title: t('admin.dashboard.totalOrders'),
            value: stats.totalOrders,
            icon: "🛒",
            gradient: "linear-gradient(to bottom right, #16a34a, #15803d)",
            link: "/admin/orders",
        },
        {
            title: t('admin.dashboard.pendingOrders'),
            value: stats.pendingOrders,
            icon: "⏳",
            gradient: "linear-gradient(to bottom right, #ca8a04, #a16207)",
            link: "/admin/orders",
        },
        {
            title: t('admin.dashboard.totalRevenue'),
            value: `${stats.totalRevenue.toLocaleString()} SDG`,
            icon: "💰",
            gradient: "linear-gradient(to bottom right, #dc2626, #991b1b)",
            link: null,
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
                    {t('admin.dashboard.welcomeTitle')}
                </h1>
                <p style={{ color: '#a3a3a3' }}>{t('admin.dashboard.welcomeSubtitle')}</p>
            </div>

            {/* Stats Cards */}
            {loading ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '24px'
                }}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} style={{
                            backgroundColor: '#171717',
                            borderRadius: '12px',
                            padding: '24px'
                        }}>
                            <div style={{
                                height: '48px',
                                width: '48px',
                                backgroundColor: '#262626',
                                borderRadius: '8px',
                                marginBottom: '16px'
                            }}></div>
                            <div style={{
                                height: '16px',
                                backgroundColor: '#262626',
                                borderRadius: '4px',
                                width: '96px',
                                marginBottom: '8px'
                            }}></div>
                            <div style={{
                                height: '32px',
                                backgroundColor: '#262626',
                                borderRadius: '4px',
                                width: '64px'
                            }}></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '24px'
                }}>
                    {statsCards.map((card, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'linear-gradient(to bottom right, #171717, rgba(23, 23, 23, 0.5))',
                                backdropFilter: 'blur(4px)',
                                borderRadius: '12px',
                                padding: '24px',
                                border: '1px solid #262626',
                                transition: 'all 0.3s',
                                cursor: card.link ? 'pointer' : 'auto'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#404040';
                                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(220, 38, 38, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#262626';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '8px',
                                background: card.gradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                                marginBottom: '16px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                            }}>
                                {card.icon}
                            </div>
                            <p style={{
                                color: '#a3a3a3',
                                fontSize: '14px',
                                fontWeight: '500',
                                marginBottom: '4px'
                            }}>{card.title}</p>
                            <p style={{
                                color: '#fff',
                                fontSize: '30px',
                                fontWeight: 'bold',
                                marginBottom: '12px'
                            }}>{card.value}</p>
                            {card.link && (
                                <Link
                                    href={card.link}
                                    style={{
                                        color: '#ef4444',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = '#f87171'}
                                    onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                                >
                                    {t('admin.dashboard.viewDetails')} →
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Actions */}
            <div style={{ marginTop: '48px' }}>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#fff',
                    marginBottom: '24px'
                }}>{t('admin.dashboard.quickActions')}</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px'
                }}>
                    <Link href="/admin/products" style={{ textDecoration: 'none', display: 'block' }}>
                        <div style={{
                            backgroundColor: '#171717',
                            border: '1px solid #262626',
                            padding: '24px',
                            borderRadius: '12px',
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#dc2626';
                                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(220, 38, 38, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#262626';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(to bottom right, #dc2626, #991b1b)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                                }}>
                                    📦
                                </div>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    margin: 0,
                                    transition: 'color 0.3s'
                                }}>
                                    {t('admin.dashboard.manageProducts')}
                                </h3>
                            </div>
                            <p style={{ color: '#a3a3a3', margin: 0 }}>
                                {t('admin.dashboard.manageProductsDesc')}
                            </p>
                        </div>
                    </Link>
                    <Link href="/admin/orders" style={{ textDecoration: 'none', display: 'block' }}>
                        <div style={{
                            backgroundColor: '#171717',
                            border: '1px solid #262626',
                            padding: '24px',
                            borderRadius: '12px',
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#2563eb';
                                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#262626';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(to bottom right, #2563eb, #1e40af)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                                }}>
                                    🛒
                                </div>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    margin: 0,
                                    transition: 'color 0.3s'
                                }}>
                                    {t('admin.dashboard.manageOrders')}
                                </h3>
                            </div>
                            <p style={{ color: '#a3a3a3', margin: 0 }}>
                                {t('admin.dashboard.manageOrdersDesc')}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
