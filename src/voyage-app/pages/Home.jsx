import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapPin, Calendar, Users, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

export default function Home() {
    const { user: currentUser } = useAuth();

    const { data: trips = [] } = useQuery({
        queryKey: ['trips'],
        queryFn: () => base44.entities.Trip.list('-created_date'),
    });

    const userTrips = trips.filter(trip =>
        trip.created_by === currentUser?.email ||
        trip.owner === currentUser?.email ||
        (trip.members || []).includes(currentUser?.email)
    );

    const stats = {
        total: userTrips.length,
        ongoing: userTrips.filter(t => t.status === 'ongoing').length,
        completed: userTrips.filter(t => t.status === 'completed').length
    };

    return (
        <div className="px-4 py-6">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <div className="mb-8">
                    <h1 className="text-[#3e2723] text-xl font-serif font-bold mb-2 leading-tight">Unveiling the Hidden Heritage of Mysuru</h1>
                    <p className="text-[#8b1a1a] text-sm font-medium tracking-wide italic">
                        From Local Hands to Curious Hearts
                    </p>
                </div>
                <Link to={createPageUrl('CreateTrip')}>
                    <button className="bg-[#8b1a1a] text-white px-10 py-3 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-[#6b1515] transition-all shadow-lg shadow-[#8b1a1a]/20 active:scale-95">
                        <Sparkles className="w-4 h-4" />
                        Start Planning
                    </button>
                </Link>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-3 gap-3 mb-10"
            >
                <div className="bg-[#faeedb]/40 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-left relative overflow-hidden group">
                    <span className="text-[#3e2723]/60 text-[10px] font-bold uppercase tracking-widest block mb-4">Total Trips</span>
                    <p className="text-4xl font-black text-[#3e2723]">{stats.total}</p>
                    <MapPin className="absolute top-4 right-4 w-5 h-5 text-[#8b1a1a]/40 group-hover:scale-110 transition-transform" />
                </div>

                <div className="bg-[#faeedb]/40 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-left relative overflow-hidden group">
                    <span className="text-[#3e2723]/60 text-[10px] font-bold uppercase tracking-widest block mb-4">Ongoing</span>
                    <p className="text-4xl font-black text-[#3e2723]">{stats.ongoing}</p>
                    <TrendingUp className="absolute top-4 right-4 w-5 h-5 text-[#8b1a1a]/40 group-hover:scale-110 transition-transform" />
                </div>

                <div className="bg-[#faeedb]/40 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-left relative overflow-hidden group">
                    <span className="text-[#3e2723]/60 text-[10px] font-bold uppercase tracking-widest block mb-4">Completed</span>
                    <p className="text-4xl font-black text-[#3e2723]">{stats.completed}</p>
                    <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-[#8b1a1a]/40 group-hover:scale-110 transition-transform" />
                </div>
            </motion.div>

            {/* Recent Trips */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-lg font-black text-[#3e2723] mb-6 tracking-tight">Recent Trips</h2>

                {userTrips.length === 0 ? (
                    <div className="bg-[#faeedb]/30 backdrop-blur-md rounded-[2.5rem] p-12 text-center border border-white/20">
                        <div className="w-20 h-20 bg-white/40 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-10 h-10 text-[#8b1a1a]/40" />
                        </div>
                        <p className="text-[#3e2723]/60 mb-6 font-medium">No trips yet. Start planning your first adventure!</p>
                        <Link to={createPageUrl('CreateTrip')}>
                            <button className="bg-[#8b1a1a] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-[#8b1a1a]/20">
                                Create Trip
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {userTrips.slice(0, 5).map((trip, index) => (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Link to={createPageUrl(`TripDetails?id=${trip.id}`)}>
                                    <div className="bg-[#faeedb]/40 backdrop-blur-md rounded-[2rem] p-8 border border-white/30 hover:bg-white/40 transition-all group relative">
                                        <div className="absolute top-8 right-8">
                                            <span className="bg-[#f5b7b1]/40 text-[#8b1a1a] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {trip.status || 'planning'}
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="font-black text-2xl text-[#3e2723] group-hover:text-[#8b1a1a] transition-colors">{trip.name}</h3>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-[#3e2723]/60 font-bold text-sm">
                                                    <MapPin className="w-4 h-4 text-[#8b1a1a]" />
                                                    <span>{trip.destination}</span>
                                                </div>
                                                <div className="flex items-center gap-6 text-[11px] font-bold text-[#3e2723]/40 uppercase tracking-wider">
                                                    <span className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        {trip.number_of_days || 0} days
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <Users className="w-4 h-4" />
                                                        {trip.number_of_travellers || 1} travelers
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
