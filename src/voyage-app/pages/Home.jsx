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
        <div className="px-4 py-6 pb-28 relative min-h-screen flex flex-col bg-[var(--color-bg-light)]">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 pt-8"
            >
                <div className="mb-2">
                    <h1 className="text-[var(--color-text-main)] text-3xl font-black mb-3 leading-tight tracking-tight font-serif">Plan Your Dream Journey</h1>
                    <p className="text-[var(--color-text-muted)] text-sm font-medium">
                        AI-powered travel planning with smart recommendations
                    </p>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col gap-6 mb-10 px-2"
            >
                <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-6 shadow-sm border border-[var(--color-primary)]/10 flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <span className="text-[var(--color-text-muted)] text-[11px] font-bold uppercase tracking-widest block mb-1">Total Trips</span>
                        <p className="text-4xl font-black text-[var(--color-primary)]">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[var(--color-white)] flex items-center justify-center shadow-sm">
                        <MapPin className="w-6 h-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                    </div>
                </div>

                <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-6 shadow-sm border border-[var(--color-primary)]/10 flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <span className="text-[var(--color-text-muted)] text-[11px] font-bold uppercase tracking-widest block mb-1">Ongoing</span>
                        <p className="text-4xl font-black text-[var(--color-primary)]">{stats.ongoing}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[var(--color-white)] flex items-center justify-center shadow-sm">
                        <TrendingUp className="w-6 h-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                    </div>
                </div>

                <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-6 shadow-sm border border-[var(--color-primary)]/10 flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <span className="text-[var(--color-text-muted)] text-[11px] font-bold uppercase tracking-widest block mb-1">Completed</span>
                        <p className="text-4xl font-black text-[var(--color-primary)]">{stats.completed}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[var(--color-white)] flex items-center justify-center shadow-sm">
                        <CheckCircle className="w-6 h-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                    </div>
                </div>
            </motion.div>

            {/* Recent Trips */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col"
            >
                {userTrips.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-[var(--color-primary)]/20 rounded-[2.5rem] bg-[var(--color-bg-secondary)]/30">
                        <div className="w-24 h-24 bg-[var(--color-white)] rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <Sparkles className="w-10 h-10 text-[var(--color-primary)]" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-2 font-serif">Start a New Adventure</h3>
                        <p className="text-[var(--color-text-muted)] mb-8 font-medium max-w-xs mx-auto">
                            Ready to explore? Create your first trip and let AI guide your journey.
                        </p>
                        <Link to={createPageUrl('CreateTrip')}>
                            <button className="bg-[var(--color-primary)] text-[var(--color-bg-light)] px-10 py-4 rounded-full text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 transition-all transform hover:scale-105 active:scale-95">
                                Create Your First Trip
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h2 className="text-lg font-black text-[var(--color-text-main)] mb-6 tracking-tight font-serif">Recent Trips</h2>
                        {userTrips.slice(0, 5).map((trip, index) => (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Link to={createPageUrl(`TripDetails?id=${trip.id}`)}>
                                    <div className="bg-[var(--color-white)] rounded-[2rem] p-8 border border-[var(--color-border-light)] shadow-sm hover:shadow-md transition-all group relative">
                                        <div className="absolute top-8 right-8">
                                            <span className="bg-[var(--color-bg-secondary)] text-[var(--color-primary)] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--color-primary)]/10">
                                                {trip.status || 'planning'}
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="font-black text-2xl text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors font-serif">{trip.name}</h3>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-bold text-sm">
                                                    <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                                                    <span>{trip.destination}</span>
                                                </div>
                                                <div className="flex items-center gap-6 text-[11px] font-bold text-[var(--color-text-muted)]/60 uppercase tracking-wider">
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
