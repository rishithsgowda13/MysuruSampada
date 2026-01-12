import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Plus, MapPin, User, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '../context/AuthContext';

import Navbar from '../components/Navbar';

export default function Layout({ children, currentPageName }) {
  const { logout } = useAuth();
  const showNav = currentPageName !== 'CreateTrip';

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)' }}>
      {/* Global Navbar */}
      <Navbar />

      <style>{`
        :root {
          /* Use global variables where possible, or define fallbacks */
          --bg-primary: var(--color-bg-light);
          --bg-secondary: var(--color-bg-secondary);
          --accent-red: var(--color-primary);
          --accent-coral: var(--color-primary-hover);
        }
        
        /* Ensure inputs and cards adapt */
        input, select, textarea {
            background-color: var(--color-white) !important;
            color: var(--color-text-main) !important;
            border-color: var(--border-light) !important;
        }

        .glass-card {
          background: var(--color-white); /* Fallback or specific variable */
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-light);
          opacity: 0.95; 
        }

        /* In Dark Mode, make glass card more transparent or dark */
        body.dark-mode .glass-card {
            background: rgba(20, 20, 20, 0.8);
            border-color: rgba(255, 255, 255, 0.1);
        }

        .gradient-text {
          color: var(--color-primary);
        }

        .radial-bg {
          background: transparent;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(139, 26, 26, 0.3);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 26, 26, 0.5);
        }
      `}</style>

      {/* Main Content */}
      <main className="pb-24 min-h-screen radial-bg">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg-light)] border-t border-[var(--color-border-light)] pb-safe pt-2">
          <div className="flex items-end justify-between px-8 max-w-md mx-auto pb-2">
            <Link
              to={createPageUrl('Home')}
              className={`flex flex-col items-center gap-1 transition-all ${currentPageName === 'Home' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'}`}
            >
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium">Home</span>
            </Link>

            <Link
              to={createPageUrl('CreateTrip')}
              className="relative -top-5"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/30 border-[4px] border-[var(--color-bg-light)] transition-transform hover:scale-105 active:scale-95">
                <Plus className="w-8 h-8 text-[var(--color-bg-light)]" />
              </div>
              <span className="text-[10px] text-[var(--color-primary)] font-bold text-center block mt-1">New Trip</span>
            </Link>

            <Link
              to={createPageUrl('MyTrips')}
              className={`flex flex-col items-center gap-1 transition-all ${currentPageName === 'MyTrips' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'}`}
            >
              <MapPin className="w-6 h-6" />
              <span className="text-[10px] font-medium">My Trips</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
