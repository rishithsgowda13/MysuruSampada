import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const BroadcastBanner = () => {
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const checkBroadcast = () => {
            const storedBroadcast = localStorage.getItem('systemBroadcast');
            if (storedBroadcast) {
                const broadcastData = JSON.parse(storedBroadcast);

                // Check if this specific broadcast ID has been dismissed
                const lastDismissedId = localStorage.getItem('lastDismissedBroadcastId');

                if (broadcastData.id.toString() !== lastDismissedId) {
                    setMessage(broadcastData);
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            } else {
                setVisible(false);
            }
        };

        // Check initially
        checkBroadcast();

        // Listen for storage events (updates from other tabs)
        window.addEventListener('storage', checkBroadcast);

        // Poll every few seconds to catch same-tab updates if not triggered by event
        const interval = setInterval(checkBroadcast, 2000);

        return () => {
            window.removeEventListener('storage', checkBroadcast);
            clearInterval(interval);
        };
    }, []);

    const dismiss = () => {
        if (message) {
            localStorage.setItem('lastDismissedBroadcastId', message.id.toString());
            setVisible(false);
        }
    };

    if (!visible || !message) return null;

    return (
        <div style={{
            backgroundColor: '#8B0000', // Deep Red
            color: '#FFFFFF',
            padding: '10px 20px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 9999, // Ensure it's on top of everything
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
            <AlertTriangle size={20} color="#FFD700" /> {/* Gold icon */}
            <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>
                {message.message}
            </span>
            <button
                onClick={dismiss}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.8)',
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '15px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default BroadcastBanner;
