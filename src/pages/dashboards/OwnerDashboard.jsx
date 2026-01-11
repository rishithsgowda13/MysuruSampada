import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Crown, Users, Briefcase, Settings, LogOut, Sun, User, Trash2, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/ThemeToggle';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const OwnerDashboard = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [partners, setPartners] = useState([]);
    const [pendingSubmissions, setPendingSubmissions] = useState([]);

    // Settings state
    const [profile, setProfile] = useState({
        name: localStorage.getItem('userName') || 'Admin',
        phone: localStorage.getItem('adminPhone') || '+91 98765 43210',
        email: localStorage.getItem('userEmail') || 'admin@mysuru.com',
    });

    const [passwords, setPasswords] = useState({
        old: '',
        new: '',
        confirm: ''
    });

    const [deletePassword, setDeletePassword] = useState('');
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [partnerSearchTerm, setPartnerSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
    );

    const filteredPartners = partners.filter(partner =>
        partner.name.toLowerCase().includes(partnerSearchTerm.toLowerCase()) ||
        partner.email.toLowerCase().includes(partnerSearchTerm.toLowerCase())
    );

    // System Controls State
    const [maintenanceMode, setMaintenanceMode] = useState(localStorage.getItem('maintenanceMode') === 'true');
    const [broadcastMsg, setBroadcastMsg] = useState('');

    const toggleMaintenance = () => {
        const password = prompt("Enter Admin Password to change Maintenance Mode:");
        if (password === "Admin@2025") {
            const newState = !maintenanceMode;
            setMaintenanceMode(newState);
            localStorage.setItem('maintenanceMode', newState);
            alert(`Maintenance Mode turned ${newState ? 'ON' : 'OFF'}`);
        } else if (password !== null) {
            alert("Incorrect Password!");
        }
    };

    const sendBroadcast = (e) => {
        e.preventDefault();
        if (!broadcastMsg.trim()) return;

        const broadcastData = {
            message: broadcastMsg,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        localStorage.setItem('systemBroadcast', JSON.stringify(broadcastData));
        alert("Broadcast sent successfully!");
        setBroadcastMsg('');
    };

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', profile.name);
        localStorage.setItem('adminPhone', profile.phone);
        localStorage.setItem('userEmail', profile.email);
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

    // Submission Management
    const [reviewPlace, setReviewPlace] = useState(null);

    // Initial check - remove simple approve. Replaced by open Review Modal.
    // const handleApprove = (id) => { ... }

    const handleReviewStart = (place) => {
        // Pre-fill with existing data, ensure fields exist for editing
        setReviewPlace({
            ...place,
            fullDesc: place.fullDesc || '',
            image: place.image || '',
            history: place.history || '',
            mapUrl: place.mapUrl || '',
            wikiUrl: place.wikiUrl || ''
        });
    };

    const confirmApprove = () => {
        if (!reviewPlace) return;
        if (!reviewPlace.image || !reviewPlace.fullDesc) {
            alert("Please fill in at least the Image URL and Full Description before approving.");
            return;
        }

        // Add to approved list
        const approved = JSON.parse(localStorage.getItem('approved_places') || '[]');
        const updatedApproved = [...approved, { ...reviewPlace, status: 'approved' }];
        localStorage.setItem('approved_places', JSON.stringify(updatedApproved));

        // Remove from pending
        const updatedPending = pendingSubmissions.filter(p => p.id !== reviewPlace.id);
        setPendingSubmissions(updatedPending);
        localStorage.setItem('pending_places', JSON.stringify(updatedPending));

        setReviewPlace(null);
        alert("Submission Approved and Published!");
    };

    const handleReject = (id) => {
        if (!window.confirm("Reject this submission?")) return;
        const updatedPending = pendingSubmissions.filter(p => p.id !== id);
        setPendingSubmissions(updatedPending);
        localStorage.setItem('pending_places', JSON.stringify(updatedPending));
    };

    useEffect(() => {
        const seedUsers = [
            { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 234 567 8900' },
            { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '+1 987 654 3210' },
            { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1 555 123 4567' },
        ];
        const seedPartners = [
            { id: 1, name: 'Grand Mysuru Hotel', email: 'contact@grandmysuru.com', phone: '+91 821 1234 567' },
            { id: 2, name: 'Royal Heritage Stays', email: 'info@royalheritage.com', phone: '+91 821 9876 543' },
        ];

        if (!localStorage.getItem('local_users')) localStorage.setItem('local_users', JSON.stringify(seedUsers));
        if (!localStorage.getItem('local_partners')) localStorage.setItem('local_partners', JSON.stringify(seedPartners));

        setUsers(JSON.parse(localStorage.getItem('local_users') || '[]'));
        setPartners(JSON.parse(localStorage.getItem('local_partners') || '[]'));
        setPendingSubmissions(JSON.parse(localStorage.getItem('pending_places') || '[]'));

        const interval = setInterval(() => {
            setUsers(JSON.parse(localStorage.getItem('local_users') || '[]'));
            setPartners(JSON.parse(localStorage.getItem('local_partners') || '[]'));
            setPendingSubmissions(JSON.parse(localStorage.getItem('pending_places') || '[]'));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            logout();
            navigate('/login');
        }
    };

    return (
        <div className="page-container">
            <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--color-primary)' }}>
                        <img src="/mysuru-sampada-logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <h2 className="text-gradient" style={{ fontSize: '2rem', margin: 0, color: 'var(--color-dashboard-title)' }}>Mysuru Sampada</h2>
                        <p style={{ color: 'var(--color-text-muted)' }}>Admin Console | Hello, {profile.name}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline'} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Briefcase size={18} /> {t('dashboard')}
                    </button>
                    <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'btn-primary' : 'btn-outline'} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Settings size={18} /> {t('settings_title')}
                    </button>
                </div>
            </header>

            {activeTab === 'dashboard' ? (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        <div className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ padding: '1rem', background: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                                <Users size={32} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>{t('total_users')}</h3>
                                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: 'var(--color-text-main)' }}>{users.length}</p>
                            </div>
                        </div>

                        <div className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ padding: '1rem', background: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                                <Briefcase size={32} color="var(--color-secondary)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>{t('total_partners')}</h3>
                                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: 'var(--color-text-main)' }}>{partners.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Pending Submissions Section */}
                    {/* Review Modal */}
                    {reviewPlace && (
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            zIndex: 2000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(4px)'
                        }}>
                            <div className="hide-scrollbar" style={{
                                backgroundColor: '#FEFDF5',
                                borderRadius: '12px',
                                width: '100%',
                                maxWidth: '600px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                            }}>
                                <div style={{
                                    padding: '1.5rem',
                                    borderBottom: '1px solid #e5e5e5',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#800000' }}>Review & Edit Submission</h3>
                                    <button onClick={() => setReviewPlace(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><XCircle size={24} color="#800000" /></button>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fff', borderRadius: '8px', border: '1px solid #fae8b4' }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666', textTransform: 'uppercase' }}>User Submitted Data</h4>
                                        <p><strong>Title:</strong> {reviewPlace.title}</p>
                                        <p><strong>Type:</strong> {reviewPlace.type}</p>
                                        <p><strong>Location:</strong> {reviewPlace.location}</p>
                                        <p><strong>Short Desc:</strong> {reviewPlace.desc}</p>
                                        <p><strong>Peak Hours:</strong> {reviewPlace.peakHours}</p>
                                    </div>

                                    <h4 style={{ marginBottom: '1rem' }}>Add Admin Details (Required)</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Image URL</label>
                                            <input
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                                                value={reviewPlace.image || ''}
                                                onChange={(e) => setReviewPlace({ ...reviewPlace, image: e.target.value })}
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Full Description</label>
                                            <textarea
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', minHeight: '100px' }}
                                                value={reviewPlace.fullDesc || ''}
                                                onChange={(e) => setReviewPlace({ ...reviewPlace, fullDesc: e.target.value })}
                                                placeholder="Detailed description..."
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>History</label>
                                            <textarea
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                                                value={reviewPlace.history || ''}
                                                onChange={(e) => setReviewPlace({ ...reviewPlace, history: e.target.value })}
                                                placeholder="Historical context..."
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Google Maps URL</label>
                                            <input
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                                                value={reviewPlace.mapUrl || ''}
                                                onChange={(e) => setReviewPlace({ ...reviewPlace, mapUrl: e.target.value })}
                                                placeholder="https://maps.google.com/..."
                                            />
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                        <button onClick={() => setReviewPlace(null)} className="btn-outline">Cancel</button>
                                        <button onClick={confirmApprove} className="btn-primary" style={{ backgroundColor: '#16a34a' }}>
                                            <CheckCircle size={18} style={{ marginRight: '8px' }} /> Approve & Publish
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <section style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 className="text-gradient" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Clock size={24} /> Pending Submissions
                            </h3>
                            <span style={{ background: 'var(--color-primary)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.9rem' }}>
                                {pendingSubmissions.length} New
                            </span>
                        </div>

                        {pendingSubmissions.length === 0 ? (
                            <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                <p>No pending submissions.</p>
                            </div>
                        ) : (
                            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: 'var(--color-bg-secondary)' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-main)' }}>Title</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-main)' }}>Type</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-main)' }}>Description</th>
                                            <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--color-text-main)' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingSubmissions.map((sub) => (
                                            <tr key={sub.id} style={{ borderTop: '1px solid var(--border-light)' }}>
                                                <td style={{ padding: '1rem', color: 'var(--color-text-main)', fontWeight: 'bold' }}>{sub.title}</td>
                                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>{sub.type}</td>
                                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub.desc}</td>
                                                <td style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                                    <button
                                                        onClick={() => handleReviewStart(sub)}
                                                        className="btn-primary"
                                                        style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', gap: '5px', background: '#eab308', borderColor: '#eab308', color: '#fff' }}
                                                    >
                                                        Review
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(sub.id)}
                                                        className="btn-outline"
                                                        style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', gap: '5px', color: '#dc2626', borderColor: '#dc2626' }}
                                                    >
                                                        <XCircle size={16} /> Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h3 className="text-gradient" style={{ fontSize: '1.5rem' }}>{t('users_directory')}</h3>

                            {/* User Search Bar */}
                            <div style={{ position: 'relative', minWidth: '300px' }}>
                                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={userSearchTerm}
                                    onChange={(e) => setUserSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 10px 10px 40px',
                                        borderRadius: '20px',
                                        border: '1px solid var(--border-light)',
                                        outline: 'none',
                                        background: 'var(--color-bg-secondary)'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '3rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'var(--color-bg-secondary)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', color: 'var(--color-text-main)' }}>{t('name')}</th>
                                        <th style={{ padding: '1rem', color: 'var(--color-text-main)' }}>{t('email')}</th>
                                        <th style={{ padding: '1rem', color: 'var(--color-text-main)' }}>{t('phone_number')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} style={{ borderTop: '1px solid var(--color-bg-secondary)' }}>
                                                <td style={{ padding: '1rem', color: 'var(--color-text-main)' }}>{user.name}</td>
                                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{user.email}</td>
                                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{user.phone}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No users found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Partners Directory */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h3 className="text-gradient" style={{ fontSize: '1.5rem' }}>Partner Directory</h3>

                            {/* Partner Search Bar */}
                            <div style={{ position: 'relative', minWidth: '300px' }}>
                                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Search partners..."
                                    value={partnerSearchTerm}
                                    onChange={(e) => setPartnerSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 10px 10px 40px',
                                        borderRadius: '20px',
                                        border: '1px solid var(--border-light)',
                                        outline: 'none',
                                        background: 'var(--color-bg-secondary)'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'var(--color-bg-secondary)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', color: 'var(--color-text-main)' }}>Details</th>
                                        <th style={{ padding: '1rem', color: 'var(--color-text-main)' }}>Contact</th>
                                        <th style={{ padding: '1rem', color: 'var(--color-text-main)' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPartners.length > 0 ? (
                                        filteredPartners.map((partner) => (
                                            <tr key={partner.id} style={{ borderTop: '1px solid var(--color-bg-secondary)' }}>
                                                <td style={{ padding: '1rem', color: 'var(--color-text-main)' }}>
                                                    <strong>{partner.name}</strong>
                                                </td>
                                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                                                    <div>{partner.email}</div>
                                                    <div>{partner.phone}</div>
                                                </td>
                                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                                                    <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>Active</span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No partners found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </>
            ) : (
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '2rem' }}>

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

                    {/* System Controls */}
                    <section className="card" style={{ padding: '2rem', border: '1px solid var(--color-primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Settings size={24} color="var(--color-primary)" />
                            <h3 style={{ fontSize: '1.5rem' }}>{t('system_controls')}</h3>
                        </div>

                        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Maintenance Mode</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                    Pauses website for all non-admin users. Use for updates.
                                </p>
                            </div>
                            <button
                                onClick={toggleMaintenance}
                                className={maintenanceMode ? 'btn-primary' : 'btn-outline'}
                                style={{
                                    minWidth: '100px',
                                    background: maintenanceMode ? '#ff4d4d' : 'transparent',
                                    borderColor: maintenanceMode ? '#ff4d4d' : 'var(--color-text-muted)',
                                    color: maintenanceMode ? 'white' : 'var(--color-text-main)'
                                }}
                            >
                                {maintenanceMode ? 'ACTIVE' : 'OFF'}
                            </button>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Broadcast Alert</h4>
                            <form onSubmit={sendBroadcast} style={{ display: 'grid', gap: '1rem' }}>
                                <textarea
                                    value={broadcastMsg}
                                    onChange={(e) => setBroadcastMsg(e.target.value)}
                                    placeholder="Type an announcement for all users..."
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: 'var(--border-radius)',
                                        border: 'var(--border-light)',
                                        minHeight: '100px',
                                        fontFamily: 'inherit'
                                    }}
                                />
                                <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
                                    Send Broadcast
                                </button>
                            </form>
                        </div>
                    </section>

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

                    {/* ... Security and Logout ... */}
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
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={handleLogout} className="btn-outline" style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }}>
                            {t('logout_admin')}
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default OwnerDashboard;
