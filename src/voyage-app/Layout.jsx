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
    <div className="min-h-screen flex flex-col relative">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pb-24 relative z-0">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg-light)] border-t border-[var(--color-primary)]/10 pb-safe pt-2 shadow-lg">
          <div className="flex items-end justify-between px-8 max-w-md mx-auto pb-2">
            <Link
              to={createPageUrl('Home')}
              className={`flex flex-col items-center gap-1 transition-all ${currentPageName === 'Home' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'}`}
            >
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium font-serif">Home</span>
            </Link>

            <Link
              to={createPageUrl('CreateTrip')}
              className="relative -top-5"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-xl shadow-[var(--color-primary)]/30 border-[4px] border-[var(--color-bg-light)] transition-transform hover:scale-105 active:scale-95">
                <Plus className="w-8 h-8 text-[#FEFDF5]" />
              </div>
              <span className="text-[10px] text-[var(--color-primary)] font-bold text-center block mt-1 font-serif">New Trip</span>
            </Link>

            <Link
              to={createPageUrl('MyTrips')}
              className={`flex flex-col items-center gap-1 transition-all ${currentPageName === 'MyTrips' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'}`}
            >
              <MapPin className="w-6 h-6" />
              <span className="text-[10px] font-medium font-serif">My Trips</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
