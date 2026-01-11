import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Settings as SettingsIcon, Sun, User, Trash2, LogOut, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Settings = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    // User State
    const [profile, setProfile] = useState({
        name: localStorage.getItem('userName') || 'Traveler',
        phone: localStorage.getItem('userPhone') || '+91 98765 43210',
        email: localStorage.getItem('userEmail') || 'traveler@example.com',
    });

    const [passwords, setPasswords] = useState({
        old: '',
        new: '',
        confirm: ''
    });

    const [deletePassword, setDeletePassword] = useState('');

    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [pendingProfile, setPendingProfile] = useState(null);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();

        const savedPhone = localStorage.getItem('userPhone') || '+91 98765 43210';
        const savedEmail = localStorage.getItem('userEmail') || 'traveler@example.com';

        if (profile.phone !== savedPhone || profile.email !== savedEmail) {
            // Phone or Email changed - Require OTP
            const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
            setGeneratedOtp(newOtp);
            setPendingProfile(profile);
            setShowOtpModal(true);

            // Simulate sending OTP
            setTimeout(() => {
                alert(`[DEMO] Your OTP for verification is: ${newOtp}`);
            }, 500);
        } else {
            // Only name changed, save directly
            localStorage.setItem('userName', profile.name);
            alert('Profile updated successfully!');
        }
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        if (otp === generatedOtp) {
            localStorage.setItem('userName', pendingProfile.name);
            localStorage.setItem('userPhone', pendingProfile.phone);
            localStorage.setItem('userEmail', pendingProfile.email);

            setShowOtpModal(false);
            setOtp('');
            setPendingProfile(null);
            alert('Profile verified and updated successfully!');
        } else {
            alert('Invalid OTP. Please try again.');
        }
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
            localStorage.clear(); // Or specific keys
            navigate('/login');
        }
    };

    return (
        <div className="page-container" style={{
            minHeight: '100vh',
            fontFamily: 'var(--font-main, sans-serif)',
            position: 'relative'
        }}>

            {/* OTP Modal */}
            {showOtpModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#FFF',
                        padding: '2rem',
                        borderRadius: '20px',
                        width: '90%',
                        maxWidth: '400px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ color: '#2C1810', marginBottom: '1rem' }}>Verify Contact Details</h3>
                        <p style={{ color: '#5D4037', marginBottom: '1.5rem' }}>
                            We've sent an OTP to your new {profile.email !== (localStorage.getItem('userEmail') || 'traveler@example.com') ? 'email' : 'phone number'}.
                        </p>

                        <form onSubmit={verifyOtp} style={{ display: 'grid', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Enter 4-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={4}
                                style={{
                                    padding: '1rem',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                    letterSpacing: '5px',
                                    borderRadius: '10px',
                                    border: '2px solid #ddd'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowOtpModal(false)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ccc',
                                        background: 'transparent',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: '#8B0000',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Header with Back Button */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <Link to="/user-dashboard" style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'var(--color-text-main)',
                        marginRight: '1rem',
                        background: 'var(--color-bg-secondary)',
                        padding: '8px',
                        borderRadius: '50%'
                    }}>
                        <ChevronLeft size={24} />
                    </Link>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-main)', margin: 0 }}>
                        {t('settings_title') || 'Settings'}
                    </h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Preferences Section */}
                    <div className="card" style={{
                        backgroundColor: 'var(--color-white)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <SettingsIcon size={24} color="var(--color-primary)" />
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)', margin: 0 }}>Preferences</h3>
                        </div>

                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Sun size={20} color="var(--color-text-muted)" />
                                    <span style={{ color: 'var(--color-text-main)' }}>{t('appearance') || 'Appearance'}</span>
                                </div>
                                <ThemeToggle />
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderTop: '1px solid #EEE',
                                paddingTop: '1.5rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: '#5D4037' }}>{t('app_language') || 'App Language'}</span>
                                </div>
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>

                    {/* Edit Profile Section */}
                    <div className="card" style={{
                        backgroundColor: 'var(--color-white)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <User size={24} color="var(--color-primary)" />
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)', margin: 0 }}>Edit Profile</h3>
                        </div>
                        <form onSubmit={handleSaveProfile} style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleProfileChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: 'var(--border-light)', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleProfileChange}
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: 'var(--border-light)', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: 'var(--border-light)', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)' }}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn-primary"
                                style={{
                                    width: 'fit-content',
                                    cursor: 'pointer'
                                }}
                            >
                                Save
                            </button>
                        </form>
                    </div>

                    {/* Security Section */}
                    <div className="card" style={{
                        backgroundColor: 'var(--color-white)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>Security</h3>

                        <form onSubmit={handleUpdatePassword} style={{ display: 'grid', gap: '1rem' }}>
                            <h4 style={{ color: 'var(--color-text-main)', margin: 0 }}>Change Password</h4>

                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Old Password</label>
                                <input
                                    type="password"
                                    name="old"
                                    value={passwords.old}
                                    onChange={handlePasswordChange}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: 'var(--border-light)', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>New Password</label>
                                    <input
                                        type="password"
                                        name="new"
                                        value={passwords.new}
                                        onChange={handlePasswordChange}
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: 'var(--border-light)', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Re-enter New Password</label>
                                    <input
                                        type="password"
                                        name="confirm"
                                        value={passwords.confirm}
                                        onChange={handlePasswordChange}
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: 'var(--border-light)', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                <button
                                    type="button"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-primary)',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        padding: 0
                                    }}
                                >
                                    Forgot Password?
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Delete Account Section */}
                    <div className="card" style={{
                        backgroundColor: 'var(--color-white)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D32F2F', marginBottom: '1rem' }}>
                            <Trash2 size={20} />
                            <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Delete Account</h4>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                            Once you delete your account, there is no going back. Please be certain.
                        </p>

                        <form onSubmit={handleDeleteAccount} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Enter Password to Confirm</label>
                                <input
                                    type="password"
                                    value={deletePassword}
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    style={{
                                        padding: '0.8rem',
                                        borderRadius: '8px',
                                        border: '1px solid #FFCDD2',
                                        backgroundColor: 'var(--color-bg-light)',
                                        color: 'var(--color-text-main)',
                                        width: '100%'
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    border: '1px solid #D32F2F',
                                    color: '#D32F2F',
                                    background: 'transparent',
                                    padding: '0.8rem 2rem',
                                    borderRadius: '25px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    width: 'fit-content',
                                    alignSelf: 'flex-end'
                                }}
                            >
                                Delete Account
                            </button>
                        </form>
                    </div>

                    {/* Logout Section */}
                    <div className="card" style={{
                        backgroundColor: 'var(--color-white)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-sm)',
                        textAlign: 'center'
                    }}>
                        <button
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                border: '1px solid #D32F2F',
                                color: '#D32F2F',
                                background: 'transparent',
                                padding: '1rem',
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            <LogOut size={20} />
                            Log Out
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
