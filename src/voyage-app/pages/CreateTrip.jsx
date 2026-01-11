import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { base44 } from '@/api/base44Client';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, X, Sparkles, Loader2, Car, Bike, Bus, Train, ExternalLink } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { motion } from 'framer-motion';

export default function CreateTrip() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { user: currentUser } = useAuth();

    const [tripData, setTripData] = useState({
        name: '',
        start_place: '',
        destinations: [''],
        start_date: '',
        end_date: '',
        budget_type: 'moderate',
        food_preferences: 'all',
        restaurant_type: 'family',
        hotel_type: 'mid_range',
        number_of_travellers: 1,
        transport_mode: 'personal',
        vehicle_type: 'car',
        mileage: 15,
        fuel_price: 100,
        public_transport_type: 'bus'
    });

    const addDestination = () => {
        setTripData(prev => ({
            ...prev,
            destinations: [...prev.destinations, '']
        }));
    };

    const removeDestination = (index) => {
        if (tripData.destinations.length > 1) {
            setTripData(prev => ({
                ...prev,
                destinations: prev.destinations.filter((_, i) => i !== index)
            }));
        }
    };

    const updateDestination = (index, value) => {
        setTripData(prev => ({
            ...prev,
            destinations: prev.destinations.map((d, i) => i === index ? value : d)
        }));
    };

    const handleSubmit = async () => {
        if (!tripData.name || !tripData.destinations[0]) return;

        setIsLoading(true);
        try {
            const days = tripData.start_date && tripData.end_date
                ? differenceInDays(new Date(tripData.end_date), new Date(tripData.start_date)) + 1
                : 5;

            const trip = await base44.entities.Trip.create({
                name: tripData.name,
                start_place: tripData.start_place,
                destination: tripData.destinations.filter(d => d).join(' → '),
                start_date: tripData.start_date,
                end_date: tripData.end_date,
                number_of_days: days,
                number_of_travellers: tripData.number_of_travellers,
                budget_type: tripData.budget_type,
                food_preferences: [tripData.food_preferences],
                restaurant_type: tripData.restaurant_type,
                hotel_type: tripData.hotel_type,
                travel_mode: tripData.transport_mode === 'personal' ? tripData.vehicle_type : tripData.public_transport_type,
                owner: currentUser?.email,
                members: [],
                status: 'planning',
                expenses: {
                    accommodation: 0,
                    food: 0,
                    transport: 0,
                    fuel: 0,
                    activities: 0,
                    misc: 0
                }
            });

            navigate(createPageUrl(`TripDetails?id=${trip.id}`));
        } catch (error) {
            console.error('Error creating trip:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className="px-4 py-6 max-w-2xl mx-auto pb-32">
            {/* Header with Back Button */}
            <div className="relative mb-10">
                <Link to={createPageUrl('Home')}>
                    <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-secondary)]/60 flex items-center justify-center hover:bg-[var(--color-bg-secondary)] transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5 text-[var(--color-primary)]" />
                    </button>
                </Link>
                <div className="text-center pt-2">
                    <h1 className="text-4xl font-black text-[var(--color-text-main)] mb-2 tracking-tight">Create New Trip</h1>
                    <p className="text-[var(--color-text-main)]/60 text-sm font-medium">AI will generate personalized recommendations for your journey</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-8"
            >
                {/* Trip Name */}
                <div className="space-y-2">
                    <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Trip Name</Label>
                    <Input
                        value={tripData.name}
                        onChange={(e) => setTripData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Kerala Adventure 2024"
                        className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] placeholder:text-[var(--color-text-main)]/40 rounded-2xl focus:ring-0 focus:border-transparent text-lg pl-6"
                    />
                </div>

                {/* Starting Location */}
                <div className="space-y-2">
                    <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Starting Location</Label>
                    <Input
                        value={tripData.start_place}
                        onChange={(e) => setTripData(prev => ({ ...prev, start_place: e.target.value }))}
                        placeholder="e.g., Bangalore"
                        className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] placeholder:text-[var(--color-text-main)]/40 rounded-2xl focus:ring-0 focus:border-transparent text-lg pl-6"
                    />
                </div>

                {/* Destinations */}
                <div className="space-y-2">
                    <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Destinations</Label>
                    <div className="space-y-3">
                        {tripData.destinations.map((dest, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Input
                                    value={dest}
                                    onChange={(e) => updateDestination(index, e.target.value)}
                                    placeholder={`Destination ${index + 1}`}
                                    className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] rounded-2xl focus:ring-0 focus:border-transparent text-lg pl-6 flex-1"
                                />
                                {tripData.destinations.length > 1 && (
                                    <button
                                        onClick={() => removeDestination(index)}
                                        className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center hover:bg-[var(--color-primary)]/20 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={addDestination}
                        className="mt-2 w-full h-14 rounded-2xl border-2 border-dashed border-[var(--color-primary)]/20 bg-[var(--color-bg-secondary)]/30 text-[var(--color-primary)] font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-bg-secondary)]/50 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Destination
                    </button>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Start Date</Label>
                        <Input
                            type="date"
                            value={tripData.start_date}
                            onChange={(e) => setTripData(prev => ({ ...prev, start_date: e.target.value }))}
                            className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] rounded-2xl focus:ring-0 focus:border-transparent pl-6"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">End Date</Label>
                        <Input
                            type="date"
                            value={tripData.end_date}
                            onChange={(e) => setTripData(prev => ({ ...prev, end_date: e.target.value }))}
                            className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] rounded-2xl focus:ring-0 focus:border-transparent pl-6"
                        />
                    </div>
                </div>

                {/* Budget & Food */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Budget Type</Label>
                        <Select value={tripData.budget_type} onValueChange={(v) => setTripData(prev => ({ ...prev, budget_type: v }))}>
                            <SelectTrigger className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] rounded-2xl focus:ring-0 pl-6 pr-4">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--color-bg-secondary)] border-transparent rounded-2xl shadow-xl">
                                <SelectItem value="budget">₹ Budget</SelectItem>
                                <SelectItem value="moderate">₹₹ Medium</SelectItem>
                                <SelectItem value="luxury">₹₹₹ Luxury</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Food Preference</Label>
                        <Select value={tripData.food_preferences} onValueChange={(v) => setTripData(prev => ({ ...prev, food_preferences: v }))}>
                            <SelectTrigger className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] rounded-2xl focus:ring-0 pl-6 pr-4">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--color-bg-secondary)] border-transparent rounded-2xl shadow-xl">
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="veg">Vegetarian</SelectItem>
                                <SelectItem value="non_veg">Non Veg</SelectItem>
                                <SelectItem value="vegan">Vegan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Restaurant & Hotel */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Restaurant Type</Label>
                        <Select value={tripData.restaurant_type} onValueChange={(v) => setTripData(prev => ({ ...prev, restaurant_type: v }))}>
                            <SelectTrigger className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] rounded-2xl focus:ring-0 pl-6 pr-4">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--color-bg-secondary)] border-transparent rounded-2xl shadow-xl">
                                <SelectItem value="street_food">Street Food</SelectItem>
                                <SelectItem value="family">Family Restaurant</SelectItem>
                                <SelectItem value="fine_dining">Fine Dining</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Hotel Type</Label>
                        <Select value={tripData.hotel_type} onValueChange={(v) => setTripData(prev => ({ ...prev, hotel_type: v }))}>
                            <SelectTrigger className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] rounded-2xl focus:ring-0 pl-6 pr-4">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--color-bg-secondary)] border-transparent rounded-2xl shadow-xl">
                                <SelectItem value="hostel">Hostel</SelectItem>
                                <SelectItem value="budget_hotel">Budget Hotel</SelectItem>
                                <SelectItem value="mid_range">Mid-Range</SelectItem>
                                <SelectItem value="luxury">Luxury</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Travelers */}
                <div className="space-y-2">
                    <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Number of Travelers</Label>
                    <Input
                        type="number"
                        min="1"
                        value={tripData.number_of_travellers}
                        onChange={(e) => setTripData(prev => ({ ...prev, number_of_travellers: parseInt(e.target.value) || 1 }))}
                        className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] rounded-2xl focus:ring-0 pl-6 text-lg"
                    />
                </div>

                {/* Transport Mode */}
                <div className="space-y-4">
                    <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Mode of Transport</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setTripData(prev => ({ ...prev, transport_mode: 'personal' }))}
                            className={`h-16 rounded-[2rem] flex items-center justify-center gap-3 font-bold transition-all border-4 ${tripData.transport_mode === 'personal'
                                ? 'bg-[var(--color-primary)] text-white border-transparent shadow-xl shadow-[var(--color-primary)]/30'
                                : 'bg-[var(--color-bg-secondary)] text-[var(--color-primary)] opacity-60 border-transparent hover:bg-[var(--color-bg-secondary)]/80'
                                }`}
                        >
                            <Car className="w-6 h-6" />
                            Personal Vehicle
                        </button>
                        <button
                            type="button"
                            onClick={() => setTripData(prev => ({ ...prev, transport_mode: 'public' }))}
                            className={`h-16 rounded-[2rem] flex items-center justify-center gap-3 font-bold transition-all border-4 ${tripData.transport_mode === 'public'
                                ? 'bg-[var(--color-primary)] text-white border-transparent shadow-xl shadow-[var(--color-primary)]/30'
                                : 'bg-[var(--color-bg-secondary)] text-[var(--color-primary)] opacity-60 border-transparent hover:bg-[var(--color-bg-secondary)]/80'
                                }`}
                        >
                            <Bus className="w-6 h-6" />
                            Public Transport
                        </button>
                    </div>
                </div>

                {/* Personal Vehicle Options */}
                {tripData.transport_mode === 'personal' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 pt-4"
                    >
                        <div className="space-y-4">
                            <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Vehicle Type</Label>
                            <div className="flex gap-4">
                                {[
                                    { value: 'car', label: 'Car', icon: Car },
                                    { value: 'bike', label: 'Bike', icon: Bike },
                                    { value: 'tt', label: 'TT/Truck', icon: Car }
                                ].map(vehicle => (
                                    <button
                                        key={vehicle.value}
                                        type="button"
                                        onClick={() => setTripData(prev => ({ ...prev, vehicle_type: vehicle.value }))}
                                        className={`flex-1 h-14 rounded-full flex items-center justify-center gap-2 font-bold transition-all ${tripData.vehicle_type === vehicle.value
                                            ? 'bg-[var(--color-accent)] text-[var(--color-primary)] shadow-md'
                                            : 'bg-[var(--color-bg-secondary)] text-[var(--color-primary)] opacity-60'
                                            }`}
                                    >
                                        <vehicle.icon className="w-5 h-5" />
                                        {vehicle.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Mileage (km/L)</Label>
                                <Input
                                    type="number"
                                    value={tripData.mileage}
                                    onChange={(e) => setTripData(prev => ({ ...prev, mileage: parseInt(e.target.value) || 15 }))}
                                    className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] rounded-2xl focus:ring-0 pl-6"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[var(--color-text-main)] font-bold text-sm tracking-wide">Fuel Price (₹/L)</Label>
                                <Input
                                    type="number"
                                    value={tripData.fuel_price}
                                    onChange={(e) => setTripData(prev => ({ ...prev, fuel_price: parseInt(e.target.value) || 100 }))}
                                    className="h-14 bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-main)] rounded-2xl focus:ring-0 pl-6"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !tripData.name || !tripData.destinations[0]}
                    className="w-full h-16 rounded-[2.5rem] bg-[var(--color-primary)] text-white font-black text-xl flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed mt-12 shadow-2xl shadow-[var(--color-primary)]/40 hover:bg-[var(--color-primary-hover)] transition-all active:scale-95"
                >
                    {isLoading ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                        <>
                            <Sparkles className="w-6 h-6" />
                            Create Trip with AI
                        </>
                    )}
                </button>
            </motion.div>
        </div>
    );
}
