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
    <div className="min-h-screen bg-gradient-to-br from-[#d1f2eb] via-[#f9e79f] to-[#f5b7b1] text-[#5c1a1a]">
      <style>{`
        :root {
          --bg-primary: #a8e6cf;
          --bg-secondary: #f4c587;
          --bg-card: rgba(255, 255, 255, 0.3);
          --accent-red: #8b1a1a;
          --accent-coral: #f78b8b;
          --accent-green: #5a9a7a;
        }
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .gradient-border {
          background: linear-gradient(135deg, #8b1a1a, #f78b8b);
          padding: 1px;
        }
        
        .gradient-btn {
          background: #8b1a1a;
        }
        
        .gradient-btn:hover {
          background: #6b1515;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #8b1a1a, #5c1a1a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
          <div className="rounded-full bg-[#8b1a1a] flex items-center justify-center shadow-md overflow-hidden border-2 border-[#8b1a1a]" style={{ width: '48px', height: '48px', minWidth: '48px' }}>
            <img src="/mysuru-sampada-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-black text-[#5c1a1a] tracking-tight">Mysuru Sampada</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center hover:bg-white/60 transition-colors shadow-sm">
            <User className="w-5 h-5 text-[#5c1a1a]" />
          </button>
          <button
            onClick={logout}
            className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center hover:bg-white/60 transition-colors shadow-sm"
          >
            <LogOut className="w-5 h-5 text-[#5c1a1a]" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-24 min-h-screen radial-bg">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#faeedb]/60 backdrop-blur-xl border-t border-white/20">
          <div className="flex items-center justify-around py-2 max-w-md mx-auto">
            <Link
              to={createPageUrl('Home')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${currentPageName === 'Home' ? 'text-[#8b1a1a] scale-110' : 'text-[#5c1a1a]/60 hover:text-[#5c1a1a]'}`}
            >
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium">Home</span>
            </Link>

            <Link
              to={createPageUrl('CreateTrip')}
              className="relative -top-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#8b1a1a] flex items-center justify-center shadow-xl shadow-[#8b1a1a]/40 border-4 border-[#faeedb]/80 transition-transform hover:scale-110 active:scale-95">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <span className="text-[10px] text-[#8b1a1a] font-bold text-center block mt-1">New Trip</span>
            </Link>

            <Link
              to={createPageUrl('MyTrips')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${currentPageName === 'MyTrips' ? 'text-[#8b1a1a] scale-110' : 'text-[#5c1a1a]/60 hover:text-[#5c1a1a]'}`}
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
