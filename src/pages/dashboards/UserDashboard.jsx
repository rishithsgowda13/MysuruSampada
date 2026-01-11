import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Map, Heart, Settings, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

const UserDashboard = () => {
    const { t } = useLanguage();

    // Fallback if translations are missing
    const t_safe = (key, defaultText) => t(key) === key ? defaultText : t(key);

    const menuItems = [
        {
            title: 'Explore Mysore',
            desc: t_safe('explore_desc', 'Discover hidden gems and cultural heritage.'),
            icon: <Compass size={32} color="#5D4037" />,
            path: '/explore',
            bgColor: '#F3E5F5' // Light Purple/Pink tint
        },
        {
            title: t('trip_planning'),
            desc: t_safe('trip_desc', 'Curate your perfect Mysore itinerary.'),
            icon: <Map size={32} color="#004d40" />,
            path: '/voyage',
            bgColor: '#E0F2F1' // Light Teal tint
        },
        {
            title: 'My Favourites',
            desc: 'Your saved places.',
            icon: <Heart size={32} color="#c62828" />,
            path: '/explore/saved-places',
            bgColor: '#FFEBEE' // Light Red tint
        }
    ];

    return (
        <div className="dashboard-container">
            {/* Settings Button */}
            <div className="dashboard-settings-btn">
                <Link to="/settings">
                    <div className="icon-circle shadow-sm hover-scale">
                        <Settings size={24} color="#5D4037" />
                    </div>
                </Link>
            </div>

            <div className="dashboard-content-wrapper">
                {/* Header */}
                <div className="dashboard-header">
                    <div className="dashboard-logo-wrapper">
                        {/* Replaced Icon with Logo Image */}
                        <div className="rounded-full overflow-hidden border-2 border-[#3E2723] mb-2 mx-auto" style={{ width: '64px', height: '64px' }}>
                            <img src="/mysuru-sampada-logo.jpg" alt="Mysuru Sampada" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="dashboard-title">
                            Mysuru Sampada
                        </h1>
                    </div>
                    <p className="dashboard-subtitle">
                        Unveiling the Hidden Heritage of Mysuru
                    </p>
                    <p className="text-[#8b1a1a] text-sm font-medium tracking-wide italic mt-1">
                        From Local Hands to Curious Hearts
                    </p>
                    <h2 className="dashboard-welcome">
                        Hello, <span className="font-bold">{localStorage.getItem('userName') || 'Traveler'}</span>
                    </h2>
                </div>

                {/* Grid Layout */}
                <div className="dashboard-feature-grid">
                    {menuItems.map((item, index) => (
                        <Link to={item.path} key={index} className="no-underline">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="dashboard-feature-card hover-lift"
                            >
                                {/* Icon Circle */}
                                <div className="feature-icon-circle" style={{ backgroundColor: '#FAF3E0' }}>
                                    {item.icon}
                                </div>

                                <h3 className="feature-title-large">
                                    {item.title}
                                </h3>

                                <p className="feature-desc-large">
                                    {item.desc}
                                </p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
