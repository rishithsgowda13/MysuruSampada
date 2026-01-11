import React from 'react';
import { format } from 'date-fns';
import {
    Navigation, Fuel, DollarSign, Calendar, Users,
    UtensilsCrossed, Hotel, Copy, Check, ArrowRight
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

export default function OverviewTab({
    trip,
    totalDistance,
    fuelCost,
    totalExpenses,
    inviteCode,
    onCopyLink,
    copied
}) {
    const budgetLabels = {
        budget: 'Budget',
        moderate: 'Medium',
        luxury: 'Luxury'
    };

    const hotelLabels = {
        hostel: 'Hostel',
        budget_hotel: 'Budget',
        mid_range: 'Mid Range',
        luxury: 'Luxury',
        resort: 'Resort'
    };

    const foodLabels = {
        all: 'All',
        veg: 'Vegetarian',
        non_veg: 'Non Veg',
        vegan: 'Vegan'
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-4"
            >
                <div className="glass-card rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">Total Distance</span>
                        <Navigation className="w-5 h-5 text-cyan-400" />
                    </div>
                    <p className="text-xl font-bold">{totalDistance} km</p>
                </div>

                <div className="glass-card rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">Fuel Cost</span>
                        <Fuel className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-xl font-bold">₹{fuelCost}</p>
                </div>

                <div className="glass-card rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">Total Expenses</span>
                        <DollarSign className="w-5 h-5 text-pink-400" />
                    </div>
                    <p className="text-xl font-bold">₹{totalExpenses}</p>
                </div>
            </motion.div>

            {/* Trip Details */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-6"
            >
                <h3 className="font-semibold mb-4">Trip Details</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <div>
                            <p className="text-xs text-gray-400">Start Date</p>
                            <p className="font-medium">
                                {trip.start_date ? format(new Date(trip.start_date), 'dd/MM/yyyy') : 'Not set'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400">Budget Type</p>
                        <p className="font-medium">{budgetLabels[trip.budget_type] || 'Medium'}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <div>
                            <p className="text-xs text-gray-400">End Date</p>
                            <p className="font-medium">
                                {trip.end_date ? format(new Date(trip.end_date), 'dd/MM/yyyy') : 'Not set'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400">Food Preference</p>
                        <p className="font-medium">{foodLabels[(trip.food_preferences || [])[0]] || 'All'}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-cyan-400" />
                        <div>
                            <p className="text-xs text-gray-400">Travelers</p>
                            <p className="font-medium">{trip.number_of_travellers || 1} people</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400">Hotel Type</p>
                        <p className="font-medium">{hotelLabels[trip.hotel_type] || 'Mid Range'}</p>
                    </div>
                </div>
            </motion.div>

            {/* Invite Friends */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-6"
            >
                <h3 className="font-semibold mb-4">Invite Friends</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Invite Code</p>
                        <p className="text-xl font-bold text-cyan-400">{inviteCode}</p>
                    </div>
                    <button
                        onClick={onCopyLink}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        Copy Link
                    </button>
                </div>
            </motion.div>

            {/* Route */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-2xl p-6"
            >
                <h3 className="font-semibold mb-4">Route</h3>
                <div className="flex items-center gap-3">
                    {trip.start_place && (
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-0 px-4 py-2">
                            {trip.start_place}
                        </Badge>
                    )}
                    <ArrowRight className="w-5 h-5 text-gray-500" />
                    <Badge className="bg-purple-500/20 text-purple-400 border-0 px-4 py-2">
                        {trip.destination}
                    </Badge>
                </div>
            </motion.div>
        </div>
    );
}
