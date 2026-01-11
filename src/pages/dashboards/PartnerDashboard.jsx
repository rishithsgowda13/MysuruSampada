import React, { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, Users, Settings, Sun, LogOut, Trash2, User, Crown, Megaphone, Check } from 'lucide-react';
// import SponsoredSection from '../../components/SponsoredSection';
// import AdModal from '../../components/AdModal';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import ThemeToggle from '../../components/ThemeToggle';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const PartnerDashboard = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [broadcast, setBroadcast] = useState(null);

    useEffect(() => {
        const storedBroadcast = localStorage.getItem('systemBroadcast');
        if (storedBroadcast) {
            setBroadcast(JSON.parse(storedBroadcast));
        }
    }, []);

    const dismissBroadcast = () => {
        setBroadcast(null);
    };
    const partnerName = localStorage.getItem('partnerName') || 'Partner';

    // Monetization State
    const [plan, setPlan] = useState(localStorage.getItem('partner_plan') || 'FREE');
    const [adConfig, setAdConfig] = useState({ content: '', duration: 1 });

    const handleUpgrade = () => {
        if (window.confirm("Upgrade to PRO Plan for ₹999/month?")) {
            setPlan('PRO');
            localStorage.setItem('partner_plan', 'PRO');
            alert("Welcome to Partner PRO! 🌟");
        }
    };

    const handleBuyAd = (e) => {
        e.preventDefault();
        if (!adConfig.content) return;

        const cost = adConfig.duration === 1 ? 100 : adConfig.duration === 3 ? 250 : adConfig.duration === 7 ? 500 : 1500;

        if (window.confirm(`Post this ad for ${adConfig.duration} days? Cost: ₹${cost}`)) {
            const newAd = {
                id: Date.now(),
                partnerName: partnerName,
                content: adConfig.content,
                durationDays: adConfig.duration,
                expiry: new Date(Date.now() + adConfig.duration * 24 * 60 * 60 * 1000).toISOString(),
                tier: plan === 'PRO' ? 'PREMIUM' : 'STANDARD'
            };

            const existingAds = JSON.parse(localStorage.getItem('active_ads') || '[]');
            localStorage.setItem('active_ads', JSON.stringify([...existingAds, newAd]));
            alert("Ad Campaign Live! 🚀");
            setAdConfig({ ...adConfig, content: '' });
        }
    };

    // Settings state
    const [profile, setProfile] = useState({
        name: partnerName,
        phone: localStorage.getItem('partnerPhone') || '+91 98765 43210',
        email: localStorage.getItem('partnerEmail') || 'partner@example.com',
    });

    const [passwords, setPasswords] = useState({
        old: '',
        new: '',
        confirm: ''
    });

    const [deletePassword, setDeletePassword] = useState('');

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        localStorage.setItem('partnerName', profile.name);
        localStorage.setItem('partnerPhone', profile.phone);
        localStorage.setItem('partnerEmail', profile.email);
        alert('Profile updated successfully!');
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("New passwords do not match!");
            return;
        }
        if (!passwords.old) {
            alert("Please enter your old password.");
            return;
        }
        alert('Password changed successfully!');
        setPasswords({ old: '', new: '', confirm: '' });
    };

    const handleForgotPassword = () => {
        alert(`Password reset link sent to ${profile.email}`);
    };

    const handleDeleteAccount = (e) => {
        e.preventDefault();
        if (!deletePassword) {
            alert("Please enter your password to confirm deletion.");
            return;
        }
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            localStorage.clear();
            navigate('/');
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('partnerName');
            localStorage.removeItem('role');
            navigate('/login');
        }
    };

    return (
        <div className="page-container">
            {/* Broadcast Banner removed */}
            {/* {broadcast && ( ... )} */}
            {/* <AdModal /> */}
            <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--color-secondary)' }}>
                        <img src="/mysuru-sampada-logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <h2 className="text-gradient" style={{ fontSize: '2rem', color: 'var(--color-dashboard-title)' }}>Mysuru Sampada</h2>
                        <p style={{ color: 'var(--color-text-muted)' }}>Partner Portal | Hello, {partnerName}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline'}>
                        {t('dashboard')}
                    </button>
                    <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'btn-primary' : 'btn-outline'} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Settings size={18} /> {t('settings_title')}
                    </button>
                </div>
            </header>

            {activeTab === 'dashboard' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Analytics Summary from before */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--color-text-main)', display: 'flex', alignItems: 'center' }}>
                                <TrendingUp size={20} style={{ marginRight: '10px', color: 'var(--color-primary)' }} />
                                Analytics
                            </h3>
                            <div className="text-gradient" style={{ marginTop: '1rem', fontSize: '2.5rem', fontWeight: 'bold' }}>+24%</div>
                            <p style={{ color: 'var(--color-text-muted)' }}>Engagement this week</p>
                        </div>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ color: 'var(--color-text-main)', display: 'flex', alignItems: 'center' }}>
                                <Users size={20} style={{ marginRight: '10px', color: 'var(--color-secondary)' }} />
                                Visitors
                            </h3>
                            <div style={{ marginTop: '1rem', fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>1,204</div>
                            <p style={{ color: 'var(--color-text-muted)' }}>Total views</p>
                        </div>
                    </div>

                    {/* Subscription Section */}
                    <section className="card" style={{ padding: '2rem', border: plan === 'PRO' ? '2px solid var(--color-accent)' : '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Crown size={24} color={plan === 'PRO' ? 'gold' : 'gray'} fill={plan === 'PRO' ? 'gold' : 'none'} />
                                    Subscription Plan: <span className="text-gradient">{plan}</span>
                                </h3>
                                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                                    {plan === 'FREE' ? 'Upgrade to unlock premium features and visibility.' : 'You are enjoying premium benefits!'}
                                </p>
                            </div>
                            {plan === 'FREE' && (
                                <button onClick={handleUpgrade} className="btn-primary" style={{ background: 'var(--color-accent)' }}>
                                    Upgrade to PRO (₹999/mo)
                                </button>
                            )}
                        </div>

                        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {/* Pro Features List */}
                            <div style={{ padding: '1rem', background: 'var(--color-bg-secondary)', borderRadius: '8px' }}>
                                <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Check size={16} color="green" /> Pro Benefits
                                </h4>
                                <ul style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', paddingLeft: '1.2rem' }}>
                                    <li>Featured in Search Results</li>
                                    <li>Advanced Analytics Dashboard</li>
                                    <li>Priority Ad Placement</li>
                                    <li>"Verified Partner" Badge</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Ad Campaign Manager */}
                    <section className="card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Megaphone size={24} color="var(--color-primary)" />
                            <h3 style={{ fontSize: '1.5rem' }}>Run Ad Campaign</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <form onSubmit={handleBuyAd} style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Ad Content / Offer</label>
                                    <textarea
                                        value={adConfig.content}
                                        onChange={(e) => setAdConfig({ ...adConfig, content: e.target.value })}
                                        placeholder="E.g., Flat 50% OFF on Weekend Stays! Book Now."
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)', minHeight: '80px' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Duration & Cost</label>
                                    <select
                                        value={adConfig.duration}
                                        onChange={(e) => setAdConfig({ ...adConfig, duration: parseInt(e.target.value) })}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                                    >
                                        <option value={1}>1 Day (₹100)</option>
                                        <option value={3}>3 Days (₹250)</option>
                                        <option value={7}>7 Days (₹500)</option>
                                        <option value={30}>1 Month (₹1500)</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn-primary">
                                    Promote Now
                                </button>
                            </form>

                            <div style={{ padding: '1rem', background: 'var(--color-bg-secondary)', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h4 style={{ marginBottom: '1rem' }}>Preview</h4>
                                <div className="card" style={{ borderLeft: '4px solid var(--color-accent)', padding: '1rem' }}>
                                    <h5 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{partnerName}</h5>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{adConfig.content || "Your ad text here..."}</p>
                                    <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Sponsored</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <SponsoredSection /> */}
                </div>
            ) : (
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Language & Appearance */}
                    <div className="card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Settings size={24} color="var(--color-primary)" />
                            <h3 style={{ fontSize: '1.5rem' }}>Preferences</h3>
                        </div>

                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Sun size={20} color="var(--color-primary)" />
                                    <span>{t('appearance')}</span>
                                </div>
                                <ThemeToggle />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span>{t('app_language')}</span>
                                </div>
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>

                    {/* Profile */}
                    <section className="card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <User size={24} color="var(--color-primary)" />
                            <h3 style={{ fontSize: '1.5rem' }}>{t('edit_profile')}</h3>
                        </div>
                        <form onSubmit={handleSaveProfile} style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ color: 'var(--color-text-muted)' }}>{t('full_name_label')}</label>
                                <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label style={{ color: 'var(--color-text-muted)' }}>{t('phone_label')}</label>
                                    <input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} />
                                </div>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label style={{ color: 'var(--color-text-muted)' }}>{t('email_label')}</label>
                                    <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>{t('save')}</button>
                        </form>
                    </section>

                    {/* Security */}
                    <section className="card" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{t('security')}</h3>
                        <form onSubmit={handleUpdatePassword} style={{ display: 'grid', gap: '1rem' }}>
                            <h4 style={{ color: 'var(--color-text-main)' }}>{t('change_password')}</h4>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ color: 'var(--color-text-muted)' }}>{t('old_password')}</label>
                                <input type="password" name="old" value={passwords.old} onChange={handlePasswordChange} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label style={{ color: 'var(--color-text-muted)' }}>{t('new_password')}</label>
                                    <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} />
                                </div>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label style={{ color: 'var(--color-text-muted)' }}>{t('confirm_new_password')}</label>
                                    <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <button type="button" onClick={handleForgotPassword} style={{ background: 'none', border: 'none', color: 'var(--color-secondary)', cursor: 'pointer', textDecoration: 'underline' }}>
                                    {t('forgot_password')}
                                </button>
                                <button type="submit" className="btn-primary">{t('update_password')}</button>
                            </div>
                        </form>
                    </section>

                    {/* Delete Account */}
                    <section className="card" style={{ padding: '2rem' }}>
                        <form onSubmit={handleDeleteAccount} style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff4d4d' }}>
                                <Trash2 size={20} />
                                <h4 style={{ fontSize: '1.2rem' }}>{t('delete_account')}</h4>
                            </div>
                            <p style={{ color: 'var(--color-text-muted)' }}>{t('delete_confirm_text')}</p>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                                <div style={{ flex: 1, display: 'grid', gap: '0.5rem' }}>
                                    <label style={{ color: 'var(--color-text-muted)' }}>{t('enter_password_confirm')}</label>
                                    <input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} style={{ borderColor: '#ff4d4d' }} />
                                </div>
                                <button type="submit" className="btn-outline" style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }}>
                                    {t('delete_account')}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Logout */}
                    <section className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <button onClick={handleLogout} className="btn-outline" style={{ width: '100%', borderColor: '#ff4d4d', color: '#ff4d4d', fontSize: '1.2rem', padding: '1rem' }}>
                            <LogOut size={20} style={{ marginRight: '10px' }} />
                            {t('logout')}
                        </button>
                    </section>
                </div>
            )}
        </div>
    );
};

export default PartnerDashboard;
