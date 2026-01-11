import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="language-switcher" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Globe size={20} color="var(--color-primary)" />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--color-bg-light)',
                    color: 'var(--color-text-main)',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    colorScheme: 'light dark' // Ensures native dropdown follows browser/OS, or we can force it based on class
                }}
            >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
