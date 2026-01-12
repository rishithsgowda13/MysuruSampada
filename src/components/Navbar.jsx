import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { t } = useLanguage();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    // Determine Dashboard Path based on Role
    let dashboardPath = '/user-dashboard'; // Default
    if (user) {
        if (user.role === 'admin' || user.role === 'owner') dashboardPath = '/owner-dashboard';
        else if (user.role === 'partner') dashboardPath = '/partner-dashboard';
    }

    // Close menu when clicking outside or navigating
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    return (
        <nav className="navbar">
            <Link to="/user-dashboard" className="navbar-logo" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="rounded-full overflow-hidden border border-[#8b1a1a]" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                    <img src="/mysuru-sampada-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <span>Mysuru Sampada</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
                className="navbar-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                {/* We need to ensure the icon is visible only on mobile via CSS or conditional rendering if we had window width hook, 
                    but CSS is safer for server/client mismatch avoidance. 
                    However, since we are adding the class in CSS, we can just render the button. 
                */}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ display: 'block' }} // The parent button is hidden on desktop by CSS
                >
                    {isOpen ? (
                        <path d="M18 6L6 18M6 6l12 12" />
                    ) : (
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    )}
                </svg>
            </button>

            <ul className={`navbar-nav ${isOpen ? 'active' : ''}`}>
                <li><Link to="/explore" onClick={() => setIsOpen(false)}>{t('explore')}</Link></li>
                <li>
                    <a href="https://www.google.com/maps/place/Mysuru,+Karnataka" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                        {t('map')}
                    </a>
                </li>
                <li><Link to="/explore/hidden-gems" onClick={() => setIsOpen(false)}>{t('hidden_gems')}</Link></li>
                <li><Link to={dashboardPath} onClick={() => setIsOpen(false)}>{t('dashboard')}</Link></li>
                <li>
                    <button
                        onClick={() => {
                            if (window.confirm(t('logout_confirmation') || "Are you sure you want to log out?")) {
                                logout();
                                navigate('/login');
                                setIsOpen(false);
                            }
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <LogOut size={18} />
                        {t('logout', 'Logout')}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
