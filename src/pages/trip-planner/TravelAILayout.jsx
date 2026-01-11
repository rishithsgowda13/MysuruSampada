import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, User, ArrowRight, Home, Plus, MapPin } from 'lucide-react';

const TravelAILayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#0F0826] text-white font-sans selection:bg-[#00CEFF]/30 pb-20">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                
                :root {
                    --bg-dark: #0F0826;
                    --card-bg: rgba(255, 255, 255, 0.05);
                    --accent: #00CEFF;
                    --text-secondary: rgba(255, 255, 255, 0.6);
                }
                
                * { font-family: 'Inter', sans-serif; }
                
                .glass-card {
                    background: linear-gradient(145deg, rgba(23, 23, 44, 0.6) 0%, rgba(13, 13, 28, 0.8) 100%);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                }
                
                .segment-control {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .pill-btn.active {
                    background: #2D68FF;
                    box-shadow: 0 0 20px rgba(45, 104, 255, 0.4);
                    border-color: #2D68FF;
                    color: white;
                }
                
                .pill-btn.inactive {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.6);
                }
                
                /* Bottom Nav Styles */
                .floating-fab {
                    background: linear-gradient(135deg, #00C6FF 0%, #0072FF 100%);
                    box-shadow: 0 0 20px rgba(0, 198, 255, 0.4);
                }
            `}</style>

            {/* Header Matching 'TravelAI' Screenshot */}
            <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-[#0F0826]/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/travel-ai-demo')}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center">
                        <Compass className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">TravelAI</span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <User className="w-5 h-5 text-white/70" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowRight className="w-5 h-5 text-white/70" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-20 px-4 min-h-screen bg-gradient-to-b from-[#0F0826] via-[#130B35] to-[#0F0826]">
                {children}
            </main>

            {/* Bottom Navigation - Fixed */}
            <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#0F0826]/90 backdrop-blur-lg border-t border-white/5 flex items-center justify-around px-6 z-50 pb-2">
                <button
                    onClick={() => navigate('/travel-ai-demo')}
                    className={`flex flex-col items-center gap-1 ${location.pathname === '/travel-ai-demo' ? 'text-[#00CEFF]' : 'text-white/40 hover:text-white/70'}`}
                >
                    <Home size={22} />
                    <span className="text-[10px] font-medium">Home</span>
                </button>

                {/* Floating Action Button */}
                <button className="floating-fab w-14 h-14 rounded-full flex items-center justify-center -mt-8 text-white hover:scale-105 transition-transform">
                    <Plus size={28} />
                </button>

                <button
                    className="flex flex-col items-center gap-1 text-white/40 hover:text-white/70"
                >
                    <MapPin size={22} />
                    <span className="text-[10px] font-medium">My Trips</span>
                </button>
            </nav>
        </div>
    );
};

export default TravelAILayout;
