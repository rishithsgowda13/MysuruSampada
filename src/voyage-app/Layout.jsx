import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Plus, MapPin, User, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children, currentPageName }) {
  const { logout } = useAuth();
  const showNav = currentPageName !== 'CreateTrip';

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)' }}>
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

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between glass-card border-b border-white/30">
        <Link to={createPageUrl('Home')} className="flex items-center gap-3">
          <div className="rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-md overflow-hidden border-2 border-[var(--color-primary)]" style={{ width: '48px', height: '48px', minWidth: '48px' }}>
            <img src="/mysuru-sampada-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-black text-[var(--color-primary)] tracking-tight">Mysuru Sampada</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center hover:bg-white/60 transition-colors shadow-sm">
            <User className="w-5 h-5 text-[var(--color-primary)]" />
          </button>
          <button
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
            className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center hover:bg-white/60 transition-colors shadow-sm"
          >
            <LogOut className="w-5 h-5 text-[var(--color-primary)]" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-24 min-h-screen radial-bg">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg-secondary)]/60 backdrop-blur-xl border-t border-white/20">
          <div className="flex items-center justify-around py-2 max-w-md mx-auto">
            <Link
              to={createPageUrl('Home')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${currentPageName === 'Home' ? 'text-[var(--color-primary)] scale-110' : 'text-[var(--color-text-muted)]/60 hover:text-[var(--color-text-muted)]'}`}
            >
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium">Home</span>
            </Link>

            <Link
              to={createPageUrl('CreateTrip')}
              className="relative -top-6"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-xl shadow-[var(--color-primary)]/40 border-4 border-[var(--color-bg-secondary)]/80 transition-transform hover:scale-110 active:scale-95">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <span className="text-[10px] text-[var(--color-primary)] font-bold text-center block mt-1">New Trip</span>
            </Link>

            <Link
              to={createPageUrl('MyTrips')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${currentPageName === 'MyTrips' ? 'text-[var(--color-primary)] scale-110' : 'text-[var(--color-text-muted)]/60 hover:text-[var(--color-text-muted)]'}`}
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
