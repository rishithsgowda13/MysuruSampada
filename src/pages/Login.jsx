import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        identifier: '', // Email or Phone
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Role-based Credentials check
        if (formData.identifier === 'admin@mysuru.com' && formData.password === 'Admin@2025') {
            login({ name: 'Admin', role: 'admin', email: formData.identifier });
            navigate('/owner-dashboard');
            return;
        }

        if (formData.identifier === 'partner@mysuru.com' && formData.password === 'Partner@2025') {
            login({ name: 'Partner', role: 'partner', email: formData.identifier });
            navigate('/partner-dashboard');
            return;
        }

        // Standard User Login (Fallback for generic user entry)
        if (formData.identifier && formData.password) {
            login({ name: 'Traveler', role: 'user', email: formData.identifier });
            navigate('/user-dashboard');
        } else {
            alert('Please enter your credentials.');
        }
    };

    return (
        <div className="page-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}>
            <div className="glass-panel" style={{
                padding: '3rem',
                width: '100%',
                maxWidth: '450px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div className="rounded-full overflow-hidden border-2 border-[#8b1a1a] mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                        <img src="/mysuru-sampada-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>Mysuru Sampada</h1>
                    <p style={{ color: 'var(--color-primary)', fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: '500' }}>Experience the Royal Heritage</p>

                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)' }}>{t('welcome_back')}</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>{t('login_subtitle')}</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label style={{ color: 'var(--color-text-main)', fontSize: '0.9rem' }}>{t('identifier_label')}</label>
                        <input
                            type="text"
                            name="identifier"
                            placeholder="Enter your email or phone"
                            value={formData.identifier}
                            onChange={handleChange}
                            required
                            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label style={{ color: 'var(--color-text-main)', fontSize: '0.9rem' }}>{t('password_label')}</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                        />
                        <div style={{ textAlign: 'right' }}>
                            <button
                                type="button"
                                onClick={() => navigate('/forgot-password')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-primary)',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                {t('forgot_password')}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                        {t('login_btn')}
                    </button>

                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{t('no_account')}</p>
                    <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className="btn-outline"
                        style={{ width: '100%' }}
                    >
                        {t('create_account_link')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
