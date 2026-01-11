import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapPin, Calendar, Users, Search, Filter } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';

export default function MyTrips() {
    const { user: currentUser } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const { data: trips = [], isLoading } = useQuery({
        queryKey: ['trips'],
        queryFn: () => base44.entities.Trip.list('-created_date'),
    });

    const userTrips = trips.filter(trip =>
        trip.created_by === currentUser?.email ||
        trip.owner === currentUser?.email ||
        (trip.members || []).includes(currentUser?.email)
    );

    const filteredTrips = userTrips.filter(trip => {
        const matchesSearch = !searchQuery ||
            trip.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.destination?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || trip.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">My Trips</h1>

            {/* Search & Filter */}
            <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5c1a1a]/50" />
                    <Input
                        placeholder="Search trips..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 bg-white/30 border-white/30 text-[#5c1a1a] placeholder:text-[#5c1a1a]/50 rounded-xl"
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['all', 'planning', 'ongoing', 'completed'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === status
                            ? 'bg-[#8b1a1a] text-white'
                            : 'bg-white/30 text-[#5c1a1a]/70 hover:bg-white/40'
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Trips List */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-[#8b1a1a] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredTrips.length === 0 ? (
                <div className="glass-card rounded-2xl p-8 text-center">
                    <MapPin className="w-12 h-12 text-[#5c1a1a]/50 mx-auto mb-4" />
                    <p className="text-[#5c1a1a]/70">No trips found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredTrips.map((trip, index) => (
                        <motion.div
                            key={trip.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * index }}
                        >
                            <Link to={createPageUrl(`TripDetails?id=${trip.id}`)}>
                                <div className="glass-card rounded-2xl p-4 hover:bg-white/40 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg">{trip.name}</h3>
                                            <div className="flex items-center gap-1 text-[#5c1a1a]/70 text-sm mt-1">
                                                <MapPin className="w-4 h-4 text-[#8b1a1a]" />
                                                <span>{trip.destination}</span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-[#5c1a1a]/70">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {trip.number_of_days || 0} days
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {trip.number_of_travellers || 1} travelers
                                                </span>
                                            </div>
                                        </div>
                                        <Badge className={`${trip.status === 'planning' ? 'bg-[#8b1a1a]/20 text-[#8b1a1a]' :
                                            trip.status === 'ongoing' ? 'bg-[#f78b8b]/30 text-[#8b1a1a]' :
                                                'bg-[#5a9a7a]/20 text-[#5a9a7a]'
                                            } border-0`}>
                                            {trip.status || 'planning'}
                                        </Badge>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
