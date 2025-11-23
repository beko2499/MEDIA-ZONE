"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminLogin() {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (err) {
            setError(t('admin.login.error'));
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a'
        }}>
            <div style={{
                backgroundColor: '#171717',
                padding: '3rem',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '450px',
                border: '1px solid #262626',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
            }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#fff' }}>Media</span>
                        <span style={{ color: '#dc2626' }}> Zone</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: '#a3a3a3' }}>{t('admin.login.subtitle')}</p>
                </div>

                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#fff'
                }}>{t('admin.login.signIn')}</h2>

                {error && (
                    <div style={{
                        backgroundColor: '#7f1d1d',
                        border: '1px solid #991b1b',
                        color: '#fca5a5',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', color: '#d4d4d4', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            {t('admin.login.email')}
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                backgroundColor: '#0a0a0a',
                                border: '1px solid #404040',
                                borderRadius: '8px',
                                padding: '0.75rem 1rem',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#dc2626'}
                            onBlur={(e) => e.target.style.borderColor = '#404040'}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#d4d4d4', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            {t('admin.login.password')}
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                backgroundColor: '#0a0a0a',
                                border: '1px solid #404040',
                                borderRadius: '8px',
                                padding: '0.75rem 1rem',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#dc2626'}
                            onBlur={(e) => e.target.style.borderColor = '#404040'}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            background: 'linear-gradient(to right, #dc2626, #b91c1c)',
                            color: '#fff',
                            padding: '0.875rem',
                            borderRadius: '8px',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.3)',
                            marginTop: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(to right, #b91c1c, #991b1b)';
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 10px 15px -3px rgba(220, 38, 38, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(to right, #dc2626, #b91c1c)';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 6px -1px rgba(220, 38, 38, 0.3)';
                        }}
                    >
                        {t('admin.login.loginBtn')}
                    </button>
                </form>
            </div>
        </div>
    );
}
