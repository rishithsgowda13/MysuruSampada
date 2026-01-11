import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Map as MapIcon, Star, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MapView = () => {
    const { t } = useLanguage();
    const [location, setLocation] = useState(null);
    const [nearbyPlaces, setNearbyPlaces] = useState([
        { id: 1, name: 'Sandalwood Craft Workshop', coords: '12.3023,76.6521', type: 'Workshop', rating: 4.8 },
        { id: 2, name: 'Jaganmohan Palace Art Gallery', coords: '12.3039,76.6528', type: 'Heritage', rating: 4.7 },
        { id: 3, name: 'Ganjifa Art Studio', coords: '12.3105,76.6667', type: 'Studio', rating: 4.9 },
        { id: 4, name: 'Mysuru Silk Weaving Center', coords: '12.2989,76.6432', type: 'Craft', rating: 4.6 },
    ]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }, []);

    const openGoogleMaps = () => {
        const query = location ? `${location.lat},${location.lng}` : 'Mysuru';
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    };

    return (
        <div className="page-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 400px', gap: '2rem', height: 'calc(100vh - 120px)' }}>

            {/* Left side: Interactive Map */}
            <div className="card" style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
                <iframe
                    title="Mysuru Sampada Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_ACTUAL_DOMAIN_KEY&q=12.2958,76.6394&center=12.2958,76.6394&zoom=14`}
                ></iframe>

                <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={openGoogleMaps} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', boxShadow: 'var(--shadow-lg)' }}>
                        <Navigation size={18} />
                        {t('open_google_maps') || 'Open Google Maps'}
                    </button>
                </div>
            </div>

            {/* Right side: Nearby Suggestions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MapPin color="var(--color-primary)" />
                        {t('nearby_hidden_gems') || 'Nearby Artisans & Gems'}
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        {location ? `Showing places near your location` : `Showing top artisan spots in Mysuru`}
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {nearbyPlaces.map(place => (
                        <div key={place.id} className="card" style={{ padding: '1rem', cursor: 'pointer', transition: 'transform 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold' }}>{place.name}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-accent)' }}>
                                    <Star size={14} fill="currentColor" /> {place.rating}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                <Info size={14} />
                                <span>{place.type}</span>
                                <span>•</span>
                                <span>{place.coords}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MapView;
