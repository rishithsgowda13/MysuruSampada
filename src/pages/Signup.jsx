import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Lock, User, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { login } = useAuth();
    const [step, setStep] = useState(1);
    // 1: Details (Name/Email/Phone), 2: Verify Both OTPs, 3: Password

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        userId: '', // Mock generated ID
        password: '',
        confirmPassword: ''
    });

    const [otp, setOtp] = useState({ email: '', phone: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.phone) {
            alert(`OTPs sent to ${formData.email} and ${formData.phone}`);
            setStep(2);
        }
    };

    const verifyBothOtps = (e) => {
        e.preventDefault();
        if (otp.email === '1234' && otp.phone === '1234') {
            alert('Email and Phone Verified! Please create your password.');
            setStep(3);
        } else {
            alert('Invalid OTPs. Please use 1234 for both.');
        }
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Create Account Logic - Persist to LocalStorage for Admin Dashboard
        const newUser = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password // In a real app, this would be hashed!
        };

        const existingUsers = JSON.parse(localStorage.getItem('local_users') || '[]');
        localStorage.setItem('local_users', JSON.stringify([...existingUsers, newUser]));

        login({ name: formData.name, email: formData.email, role: 'user' });
        alert("Account Created Successfully! Logging you in...");
        navigate('/user-dashboard'); // Fixed path from /dashboard/user to /user-dashboard
    };

    const handleGoogleSignIn = () => {
        alert("Redirecting to Google Sign In...");
        // Mock Google Mock
        setTimeout(() => {
            const googleUser = {
                id: Date.now(),
                name: 'Google User',
                email: 'google@example.com',
                phone: 'N/A'
            };

            const existingUsers = JSON.parse(localStorage.getItem('local_users') || '[]');
            // Check if exists
            if (!existingUsers.find(u => u.email === 'google@example.com')) {
                localStorage.setItem('local_users', JSON.stringify([...existingUsers, googleUser]));
            }

            login({ name: 'Google User', email: 'google@example.com', role: 'user' });
            navigate('/user-dashboard'); // Fixed path
        }, 1500);
    };

    return (
        <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px' }}>
                <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', textAlign: 'center' }}>
                    <div className="rounded-full overflow-hidden border-2 border-[#8b1a1a] mb-4" style={{ width: '80px', height: '80px' }}>
                        <img src="/mysuru-sampada-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>Mysuru Sampada</h1>
                    <p style={{ color: 'var(--color-primary)', fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: '500' }}>Experience the Royal Heritage</p>

                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                        <button onClick={() => navigate('/login')} className="btn-outline" style={{ padding: '8px', borderRadius: '50%', border: 'none', marginRight: '1rem', position: 'absolute', left: '3rem' }}>
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="text-gradient" style={{ fontSize: '1.8rem', margin: 0 }}>{t('create_account_title')}</h2>
                    </div>
                </header>

                {/* Progress Indicators */}
                <div style={{ display: 'flex', gap: '5px', marginBottom: '2rem' }}>
                    {[1, 2, 3].map(s => (
                        <div key={s} style={{
                            flex: 1,
                            height: '4px',
                            borderRadius: '2px',
                            background: step >= s ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'
                        }} />
                    ))}
                </div>

                {step === 1 && (
                    <>
                        <form onSubmit={handleInitialSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label>{t('full_name_label')}</label>
                                <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label>{t('email_label')}</label>
                                <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label>{t('phone_label')}</label>
                                <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn-primary">{t('verify_details')}</button>
                        </form>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
                            <hr style={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
                            <span style={{ color: 'var(--color-text-muted)' }}>OR</span>
                            <hr style={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
                        </div>

                        <button onClick={handleGoogleSignIn} className="btn-outline" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" /></svg>
                            {t('google_sign_up')}
                        </button>
                    </>
                )}

                {step === 2 && (
                    <form onSubmit={verifyBothOtps} style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <CheckCircle size={48} color="var(--color-primary)" style={{ margin: '0 auto' }} />
                            <h3 style={{ marginTop: '1rem' }}>{t('verify_contact')}</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>{t('otp_subtitle')}</p>
                        </div>

                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <label>{t('email_otp')} ({formData.email})</label>
                            <input
                                type="text"
                                placeholder="Email Code"
                                maxLength="4"
                                value={otp.email}
                                onChange={(e) => setOtp({ ...otp, email: e.target.value })}
                                style={{ textAlign: 'center', letterSpacing: '3px' }}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <label>{t('phone_otp')} ({formData.phone})</label>
                            <input
                                type="text"
                                placeholder="Phone Code"
                                maxLength="4"
                                value={otp.phone}
                                onChange={(e) => setOtp({ ...otp, phone: e.target.value })}
                                style={{ textAlign: 'center', letterSpacing: '3px' }}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary">{t('verify_both')}</button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleFinalSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                        <h3>{t('secure_account')}</h3>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <label>{t('create_password')}</label>
                            <input type="password" name="password" placeholder="Strong password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <label>{t('confirm_password')}</label>
                            <input type="password" name="confirmPassword" placeholder="Repeat password" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn-primary">{t('create_account_title')}</button>
                    </form>
                )}

            </div>
        </div>
    );
};

export default Signup;
