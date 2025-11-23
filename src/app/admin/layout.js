"use client";

import "./admin.css";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { language, toggleLanguage, dir, t } = useLanguage();

    useEffect(() => {
        // Handle responsive layout
        const checkSize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkSize();
        window.addEventListener('resize', checkSize);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                if (pathname !== "/admin/login") {
                    router.push("/admin/login");
                }
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
            window.removeEventListener('resize', checkSize);
        };
    }, [router, pathname]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
                <div style={{ textAlign: 'center' }}>
                    <div className="w-16 h-16 border-3 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{
                        margin: '0 auto 16px',
                        border: '4px solid #dc2626',
                        borderTopColor: 'transparent'
                    }}></div>
                    <p style={{ fontSize: '18px' }}>{t('admin.dashboard.loading')}</p>
                </div>
            </div>
        );
    }

    if (!user && pathname !== "/admin/login") {
        return null;
    }

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const navItems = [
        { name: t('admin.nav.dashboard'), href: "/admin", icon: "📊" },
        { name: t('admin.nav.products'), href: "/admin/products", icon: "📦" },
        { name: t('admin.nav.orders'), href: "/admin/orders", icon: "🛒" },
    ];

    const isActiveRoute = (href) => pathname === href;

    const navLinkStyle = (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        transition: 'all 0.2s',
        textDecoration: 'none',
        backgroundColor: isActive ? '#dc2626' : 'transparent',
        color: isActive ? '#fff' : '#a3a3a3',
        boxShadow: isActive ? '0 0 20px rgba(220, 38, 38, 0.5)' : 'none'
    });

    const sidebarContent = (
        <>
            {/* Logo */}
            <div style={{ padding: '24px', borderBottom: '1px solid #262626' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                    <span className="fire-text">{t('admin.nav.mediaZone')}</span>
                </h1>
                <p style={{ fontSize: '12px', color: '#737373', marginTop: '4px' }}>
                    {t('admin.nav.adminDashboard')}
                </p>
            </div>

            {/* Navigation */}
            <nav style={{
                flex: 1,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        style={navLinkStyle(isActiveRoute(item.href))}
                        onMouseEnter={(e) => {
                            if (!isActiveRoute(item.href)) {
                                e.currentTarget.style.backgroundColor = '#171717';
                                e.currentTarget.style.color = '#fff';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActiveRoute(item.href)) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#a3a3a3';
                            }
                        }}
                    >
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ fontWeight: '500' }}>{item.name}</span>
                    </Link>
                ))}
            </nav>

            {/* User Section */}
            <div style={{ padding: '16px', borderTop: '1px solid #262626' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                    padding: '8px'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(to bottom right, #dc2626, #991b1b)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>
                        {user?.email?.[0]?.toUpperCase() || "A"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#fff',
                            margin: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>{user?.email || "Admin"}</p>
                        <p style={{ fontSize: '12px', color: '#737373', margin: 0 }}>
                            {t('admin.nav.adminRole')}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%',
                        backgroundColor: '#171717',
                        color: '#fff',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#171717'}
                >
                    <span>🚪</span>
                    <span>{t('admin.nav.logout')}</span>
                </button>
            </div>
        </>
    );

    const isRTL = dir === 'rtl';

    return (
        <div className="min-h-screen flex bg-neutral-950" dir={dir}>
            {/* Desktop Sidebar */}
            <aside style={{
                display: isDesktop ? 'flex' : 'none',
                flexDirection: 'column',
                width: '256px',
                backgroundColor: '#000',
                borderRight: isRTL ? 'none' : '1px solid #262626',
                borderLeft: isRTL ? '1px solid #262626' : 'none',
                position: 'fixed',
                height: '100%',
                left: isRTL ? 'auto' : 0,
                right: isRTL ? 0 : 'auto',
                zIndex: 40
            }}>
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpen && !isDesktop && (
                <>
                    {/* Backdrop */}
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(2px)',
                            zIndex: 40
                        }}
                        onClick={() => setSidebarOpen(false)}
                    ></div>

                    {/* Sidebar */}
                    <aside style={{
                        position: 'fixed',
                        left: isRTL ? 'auto' : 0,
                        right: isRTL ? 0 : 'auto',
                        top: 0,
                        height: '100%',
                        width: '256px',
                        backgroundColor: '#000',
                        borderRight: isRTL ? 'none' : '1px solid #262626',
                        borderLeft: isRTL ? '1px solid #262626' : 'none',
                        zIndex: 50,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            padding: '24px',
                            borderBottom: '1px solid #262626',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                                    <span className="fire-text">{t('admin.nav.mediaZone')}</span>
                                </h1>
                                <p style={{ fontSize: '12px', color: '#737373', marginTop: '4px' }}>
                                    {t('admin.nav.adminDashboard')}
                                </p>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                style={{
                                    color: '#a3a3a3',
                                    fontSize: '24px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Same content as desktop minus logo */}
                        <nav style={{
                            flex: 1,
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            {navItems.map((item) => (
                                <Link
                                    key={"mobile-" + item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    style={navLinkStyle(isActiveRoute(item.href))}
                                >
                                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                                    <span style={{ fontWeight: '500' }}>{item.name}</span>
                                </Link>
                            ))}
                        </nav>

                        <div style={{ padding: '16px', borderTop: '1px solid #262626' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '12px',
                                padding: '8px'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(to bottom right, #dc2626, #991b1b)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>
                                    {user?.email?.[0]?.toUpperCase() || "A"}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#fff',
                                        margin: 0,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>{user?.email || "Admin"}</p>
                                    <p style={{ fontSize: '12px', color: '#737373', margin: 0 }}>
                                        {t('admin.nav.adminRole')}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#171717',
                                    color: '#fff',
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <span>🚪</span>
                                <span>{t('admin.nav.logout')}</span>
                            </button>
                        </div>
                    </aside>
                </>
            )}

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: isDesktop && !isRTL ? '256px' : 0,
                marginRight: isDesktop && isRTL ? '256px' : 0,
                transition: 'margin 0.2s'
            }}>
                {/* Top Bar */}
                <header style={{
                    backgroundColor: '#000',
                    borderBottom: '1px solid #262626',
                    position: 'sticky',
                    top: 0,
                    zIndex: 30
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 24px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {/* Mobile menu button */}
                            {!isDesktop && (
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    style={{
                                        color: '#fff',
                                        fontSize: '24px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0
                                    }}
                                >
                                    ☰
                                </button>
                            )}
                            <h2 style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#fff',
                                margin: 0
                            }}>
                                {navItems.find((item) => item.href === pathname)?.name || t('admin.nav.dashboard')}
                            </h2>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {/* Language Switcher */}
                            <button
                                onClick={toggleLanguage}
                                style={{
                                    backgroundColor: '#171717',
                                    color: '#fff',
                                    border: '1px solid #262626',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <span>🌐</span>
                                <span>{language === 'en' ? 'AR' : 'EN'}</span>
                            </button>

                            <div style={{
                                display: isDesktop ? 'flex' : 'none',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px'
                            }}>
                                <span style={{ color: '#a3a3a3' }}>{t('admin.nav.welcome')},</span>
                                <span style={{ color: '#fff', fontWeight: '500' }}>
                                    {user?.email?.split("@")[0]}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

