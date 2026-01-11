import React from 'react';
import { useNavigate } from 'react-router-dom';
import TravelAILayout from './TravelAILayout';
import { MapPin, Calendar, Users, TrendingUp, Plus } from 'lucide-react';

const TravelAIHome = () => {
    const navigate = useNavigate();

    return (
        <TravelAILayout>
            <div className="max-w-6xl mx-auto px-2 pt-6">

                {/* Hero Section */}
                <div className="text-center mb-8">
                    <h1 className="text-xl md:text-2xl font-medium text-white/90 mb-6">
                        AI-powered travel planning with smart recommendations
                    </h1>
                    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0072FF] font-bold text-white shadow-[0_0_20px_rgba(0,198,255,0.4)] hover:scale-105 transition-transform flex items-center gap-2 mx-auto text-sm tracking-wide">
                        <span className="text-lg">✨</span> Start Planning
                    </button>
                </div>

                {/* Stats Grid - Exact Match */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
                    {/* Total Trips */}
                    <div className="glass-card p-5 rounded-[24px] relative overflow-hidden flex items-center justify-between h-24">
                        <div>
                            <span className="text-xs text-white/60 font-medium block mb-1">Total Trips</span>
                            <h2 className="text-3xl font-bold text-white">1</h2>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#00CEFF]/10 flex items-center justify-center text-[#00CEFF]">
                            <MapPin size={20} />
                        </div>
                    </div>

                    {/* Ongoing */}
                    <div className="glass-card p-5 rounded-[24px] relative overflow-hidden flex items-center justify-between h-24">
                        <div>
                            <span className="text-xs text-white/60 font-medium block mb-1">Ongoing</span>
                            <h2 className="text-3xl font-bold text-white">0</h2>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#2D68FF]/10 flex items-center justify-center text-[#2D68FF]">
                            <TrendingUp size={20} />
                        </div>
                    </div>

                    {/* Completed */}
                    <div className="glass-card p-5 rounded-[24px] relative overflow-hidden flex items-center justify-between h-24">
                        <div>
                            <span className="text-xs text-white/60 font-medium block mb-1">Completed</span>
                            <h2 className="text-3xl font-bold text-white">0</h2>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#FF4B4B]/10 flex items-center justify-center text-[#FF4B4B]">
                            <Calendar size={20} />
                        </div>
                    </div>
                </div>

                {/* Recent Trips Section */}
                <div className="mb-20">
                    <h2 className="text-xl font-bold text-white mb-4 pl-1">Recent Trips</h2>

                    <div
                        onClick={() => navigate('/travel-ai-demo/detail')}
                        className="glass-card p-6 rounded-[28px] cursor-pointer hover:border-white/20 transition-all group relative overflow-hidden bg-gradient-to-br from-[#1a1f3c] to-[#0F0826]"
                    >
                        {/* Trip ID and Status Circle */}
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-2xl font-bold text-white">3214</h3>
                        </div>

                        {/* Trip Details */}
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-3 text-white/60 text-sm">
                                <div className="w-5 flex justify-center"><MapPin size={16} className="text-[#00CEFF]" /></div>
                                <span className="text-white/80 font-medium">Ooty</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/60 text-sm">
                                <div className="w-5 flex justify-center"><Calendar size={16} className="text-[#00CEFF]" /></div>
                                <span className="text-white/80 font-medium">5 days</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/60 text-sm">
                                <div className="w-5 flex justify-center"><Users size={16} className="text-[#00CEFF]" /></div>
                                <span className="text-white/80 font-medium">1 travelers</span>
                            </div>
                        </div>

                        {/* Planning Pill */}
                        <span className="inline-block px-4 py-1 rounded-full bg-[#FF9F43] text-[#3E1A00] text-[10px] font-bold uppercase tracking-wider">
                            planning
                        </span>
                    </div>
                </div>

            </div>
        </TravelAILayout>
    );
};

export default TravelAIHome;
