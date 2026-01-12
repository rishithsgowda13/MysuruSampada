import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Map, Heart, Settings, MapPin, Users, Calendar, MapPinned } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

const UserDashboard = () => {
    const { t } = useLanguage();

    // Menu Items Configuration
    const menuItems = [
        {
            title: t('explore'),
            icon: <Compass size={32} color="#800000" />,
            desc: t('explore_desc_dash'),
            path: '/explore',
            bgColor: '#FFF8E1' // Light Amber tint
        },
        {
            title: t('trip_planning'),
            icon: <Calendar size={32} color="#800000" />,
            desc: t('agent_desc'),
            path: '/voyage',
            bgColor: '#E1F5FE' // Light Blue tint
        },
        {
            title: t('all_crafts'),
            icon: <Users size={32} color="#800000" />,
            desc: t('arts_desc'),
            path: '/landing',
            bgColor: '#FFF3E0' // Light Orange tint
        },
        {
            title: t('saved_places'),
            icon: <Heart size={32} color="#800000" />,
            desc: t('saved_desc'),
            path: '/explore/saved-places',
            bgColor: '#FCE4EC' // Light Pink tint
        },
        {
            title: t('trips'),
            icon: <Map size={32} color="#800000" />,
            desc: t('trips_desc_dash'),
            path: '/voyage/my-trips',
            bgColor: '#E8F5E9' // Light Green tint
        },
        {
            title: t('google_maps'),
            icon: <MapPinned size={32} color="#800000" />,
            desc: t('maps_desc_dash'),
            path: 'https://www.google.com/maps/search/Mysuru,+Karnataka',
            isExternal: true,
            bgColor: '#E3F2FD' // Light Blue
        }
    ];

    // Removed inline background color to allow global theme
    return (
        <div className="dashboard-container">
            {/* Settings Button */}
            <div className="dashboard-settings-btn">
                <Link to="/settings">
                    <div className="icon-circle shadow-sm hover-scale">
                        <Settings size={24} color="var(--color-settings-icon)" />
                    </div>
                </Link>
            </div>

            <div className="dashboard-content-wrapper">
                {/* Header */}
                <div className="dashboard-header">
                    <div className="dashboard-logo-wrapper">
                        {/* Replaced Icon with Logo Image */}
                        <div className="rounded-full overflow-hidden border-2 mb-2 mx-auto" style={{ width: '64px', height: '64px', borderColor: 'var(--color-primary)' }}>
                            <img src="/mysuru-sampada-logo.jpg" alt="Mysuru Sampada" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="dashboard-title" style={{ color: 'var(--color-dashboard-title)' }}>
                            {t('mysuru_sampada')}
                        </h1>
                    </div>
                    <p className="dashboard-subtitle" style={{ color: 'var(--color-dashboard-title)', opacity: 0.9 }}>
                        {t('dashboard_subtitle')}
                    </p>
                    <p className="text-sm font-medium tracking-wide italic mt-1" style={{ color: 'var(--color-dashboard-title)', opacity: 0.8 }}>
                        {t('dashboard_tagline')}
                    </p>
                    <h2 className="dashboard-welcome" style={{ color: 'var(--color-dashboard-title)' }}>
                        {t('hello')}, <span className="font-bold">{localStorage.getItem('userName') || 'Traveler'}</span>
                    </h2>
                </div>

                {/* Grid Layout */}
                <div className="dashboard-feature-grid">
                    {menuItems.map((item, index) => (
                        item.isExternal ? (
                            <a href={item.path} key={index} target="_blank" rel="noopener noreferrer" className="no-underline">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="dashboard-feature-card hover-lift"
                                >
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
                            </a>
                        ) : (
                            <Link to={item.path} key={index} className="no-underline">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="dashboard-feature-card hover-lift"
                                >
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
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
