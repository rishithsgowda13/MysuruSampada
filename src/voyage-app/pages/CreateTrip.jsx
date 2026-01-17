import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, X, Sparkles, Loader2, Car, Bike, Bus, Train, ExternalLink, Map, Calendar, Coins, Utensils, Hotel, Users, UserRound, MapPin, Wallet, Banknote, Bed, Home, Castle, Leaf, Fish, Sprout, Coffee, Wine, UtensilsCrossed, Settings } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';
import { motion } from 'framer-motion';

export default function CreateTrip() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editTripId = searchParams.get('edit');
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
        number_of_travellers: '',
        transport_mode: 'personal',
        vehicle_type: 'car',
        mileage: '',
        fuel_price: '',
        public_transport_type: 'bus'
    });

    useEffect(() => {
        if (editTripId) {
            const fetchTrip = async () => {
                try {
                    const trips = await base44.entities.Trip.filter({ id: editTripId });
                    if (trips && trips[0]) {
                        const trip = trips[0];
                        // Identify transport mode and sub-type
                        let tMode = 'personal';
                        let vType = 'car';
                        let pType = 'bus';

                        // Heuristic to determine transport from saved 'travel_mode'
                        const savedMode = trip.travel_mode || 'car';
                        const publicModes = ['train', 'bus', 'auto', 'any'];
                        const personalModes = ['car', 'bike', 'bus']; // 'bus' overlaps, but logic below handles it

                        if (publicModes.includes(savedMode) || savedMode === 'any') {
                            tMode = 'public';
                            pType = savedMode === 'any' ? '' : savedMode; // If 'any', leave empty or default? Let's default to bus or leave blank if we allowed that.
                        } else {
                            tMode = 'personal';
                            vType = savedMode;
                        }

                        // Handle 'bus' ambiguity if needed, but assuming 'bus' in personal context is 'bus' vehicle
                        // If we strictly separated them in backend, helpful. Here trusting heuristic.

                        setTripData({
                            name: trip.name || '',
                            start_place: trip.start_place || '',
                            destinations: trip.destination ? trip.destination.split(' → ') : [''],
                            start_date: trip.start_date || '',
                            end_date: trip.end_date || '',
                            budget_type: trip.budget_type || 'moderate',
                            food_preferences: trip.food_preferences?.[0] || 'all',
                            restaurant_type: trip.restaurant_type || 'family',
                            hotel_type: trip.hotel_type || 'mid_range',
                            number_of_travellers: trip.number_of_travellers || '',
                            transport_mode: tMode,
                            vehicle_type: vType,
                            public_transport_type: pType,
                            mileage: '', // Reset or fetch if saved
                            fuel_price: '' // Reset or fetch if saved
                        });
                    }
                } catch (error) {
                    console.error("Failed to fetch trip for editing", error);
                }
            };
            fetchTrip();
        }
    }, [editTripId]);

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

            // Use defaults if empty string for submission logic
            const travellers = tripData.number_of_travellers === '' ? 1 : parseInt(tripData.number_of_travellers);
            // Default mileage/fuel only matters for personal transport cost calc, usually backend handles or we send.
            // If we strictly need numbers:
            const mileageVal = tripData.mileage === '' ? 15 : parseInt(tripData.mileage);
            const fuelPriceVal = tripData.fuel_price === '' ? 100 : parseInt(tripData.fuel_price);

            const tripPayload = {
                name: tripData.name,
                start_place: tripData.start_place,
                destination: tripData.destinations.filter(d => d).join(' → '),
                start_date: tripData.start_date,
                end_date: tripData.end_date,
                number_of_days: days,
                number_of_travellers: travellers,
                budget_type: tripData.budget_type,
                food_preferences: [tripData.food_preferences],
                restaurant_type: tripData.restaurant_type,
                hotel_type: tripData.hotel_type,
                travel_mode: tripData.transport_mode === 'personal' ? tripData.vehicle_type : (tripData.public_transport_type || 'any'),
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
            };

            let trip;
            if (editTripId) {
                // Update existing trip
                await base44.entities.Trip.update(editTripId, tripPayload);
                trip = { id: editTripId };
                toast.success('Trip updated successfully!');
            } else {
                // Create new trip
                trip = await base44.entities.Trip.create(tripPayload);
            }

            navigate(createPageUrl(`TripDetails?id=${trip.id}`));
        } catch (error) {
            console.error('Error saving trip:', error);
            toast.error('Failed to save trip');
        }
        setIsLoading(false);
    };

    return (
        <div className="px-6 py-8 max-w-5xl mx-auto pb-40">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <Link to={createPageUrl(editTripId ? `TripDetails?id=${editTripId}` : 'Home')}>
                        <button className="w-12 h-12 rounded-full bg-white border border-[var(--color-bg-secondary)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm group">
                            <ArrowLeft className="w-6 h-6 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-[var(--color-dashboard-title)] tracking-tight font-serif leading-none">{editTripId ? 'Edit Your Trip' : 'Create New Trip'}</h1>
                        <p className="text-[var(--color-text-muted)] text-sm font-medium font-serif italic mt-1">{editTripId ? 'Update your travel details' : 'Let AI plan your perfect Mysore getaway'}</p>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
                {/* Left Column: Trip Details & Preferences */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Section 1: Trip Essentials */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[var(--color-bg-secondary)]/50 relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
                                <Map className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--color-text-main)] font-serif">Trip Essentials</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 col-span-2">
                                <Label className="font-bold text-sm font-serif text-[var(--color-text-main)]">Trip Name</Label>
                                <Input
                                    value={tripData.name}
                                    onChange={(e) => setTripData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g., Mysore Heritage Tour"
                                    className="h-12 bg-[var(--color-bg-light)] border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-sm font-serif text-[var(--color-text-main)]">Starting From</Label>
                                <Input
                                    value={tripData.start_place}
                                    onChange={(e) => setTripData(prev => ({ ...prev, start_place: e.target.value }))}
                                    placeholder="e.g., Bangalore"
                                    className="h-12 bg-[var(--color-bg-light)] border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-sm font-serif text-[var(--color-text-main)] flex items-center gap-2">
                                    <UserRound className="w-4 h-4 text-[var(--color-text-muted)]" />
                                    Travelers
                                </Label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={tripData.number_of_travellers}
                                    onChange={(e) => setTripData(prev => ({ ...prev, number_of_travellers: e.target.value === '' ? '' : parseInt(e.target.value) }))}
                                    placeholder="Number of people"
                                    className="h-12 bg-[var(--color-bg-light)] border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <Label className="font-bold text-sm font-serif text-[var(--color-text-main)] flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[var(--color-text-muted)]" />
                                Destinations
                            </Label>
                            {tripData.destinations.map((dest, index) => (
                                <div key={index} className="flex gap-3">
                                    <Input
                                        value={dest}
                                        onChange={(e) => updateDestination(index, e.target.value)}
                                        placeholder="Where do you want to go?"
                                        className="h-12 bg-[var(--color-bg-light)] border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 rounded-xl flex-1"
                                    />
                                    {tripData.destinations.length > 1 && (
                                        <button
                                            onClick={() => removeDestination(index)}
                                            className="w-12 h-12 rounded-xl border border-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={addDestination}
                                className="mt-4 mb-8 w-full py-4 rounded-xl border-2 border-dashed border-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold text-sm hover:bg-[var(--color-bg-secondary)]/30 transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add Another Destination
                            </button>
                        </div>
                    </div>

                    {/* Section 2: Dates & Budget */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[var(--color-bg-secondary)]/50 relative z-0">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--color-text-main)] font-serif">Trip Details</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="font-bold text-sm font-serif text-[var(--color-text-main)]">Start Date</Label>
                                <Input
                                    type="date"
                                    value={tripData.start_date}
                                    onChange={(e) => setTripData(prev => ({ ...prev, start_date: e.target.value }))}
                                    className="h-12 bg-[var(--color-bg-light)] border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-sm font-serif text-[var(--color-text-main)]">End Date</Label>
                                <Input
                                    type="date"
                                    value={tripData.end_date}
                                    onChange={(e) => setTripData(prev => ({ ...prev, end_date: e.target.value }))}
                                    className="h-12 bg-[var(--color-bg-light)] border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 rounded-xl"
                                />
                            </div>
                            <div className="space-y-3 col-span-2">
                                <Label className="font-bold text-sm font-serif text-[var(--color-text-main)]">Budget Level</Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'budget', label: 'Budget', icon: Wallet },
                                        { id: 'moderate', label: 'Moderate', icon: Banknote },
                                        { id: 'luxury', label: 'Luxury', icon: Sparkles } // Using Sparkles as generic luxury
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setTripData(prev => ({ ...prev, budget_type: item.id }))}
                                            className={`py-4 rounded-xl flex flex-col items-center gap-2 transition-all border ${tripData.budget_type === item.id
                                                ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-primary)]'
                                                : 'bg-[var(--color-bg-light)] border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]/50'
                                                }`}
                                        >
                                            {item.icon && <item.icon className="w-5 h-5" />}
                                            <span className="text-xs font-bold capitalize">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3 col-span-2">
                                <Label className="font-bold text-sm font-serif text-[var(--color-text-main)]">Accommodation</Label>
                                <div className="grid grid-cols-4 gap-3">
                                    {[
                                        { id: 'hostel', label: 'Hostel', icon: Bed },
                                        { id: 'budget_hotel', label: 'Budget', icon: Home },
                                        { id: 'mid_range', label: 'Comfort', icon: Hotel },
                                        { id: 'luxury', label: 'Luxury', icon: Castle }
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setTripData(prev => ({ ...prev, hotel_type: item.id }))}
                                            className={`py-4 rounded-xl flex flex-col items-center gap-2 transition-all border ${tripData.hotel_type === item.id
                                                ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-primary)]'
                                                : 'bg-[var(--color-bg-light)] border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]/50'
                                                }`}
                                        >
                                            {item.icon && <item.icon className="w-5 h-5" />}
                                            <span className="text-xs font-bold capitalize">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Preferences & Transport */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Section 3: Food */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[var(--color-bg-secondary)]/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
                                <Utensils className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--color-text-main)] font-serif">Food</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="font-bold text-sm font-serif text-[var(--color-text-main)]">Dietary Preference</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: 'all', label: 'All', icon: Utensils },
                                        { id: 'veg', label: 'Veg', icon: Leaf },
                                        { id: 'non_veg', label: 'Non-Veg', icon: Fish }, // Using Fish as generic non-veg
                                        { id: 'vegan', label: 'Vegan', icon: Sprout }
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setTripData(prev => ({ ...prev, food_preferences: item.id }))}
                                            className={`py-4 rounded-xl flex flex-col items-center gap-2 transition-all border ${tripData.food_preferences === item.id
                                                ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-primary)]'
                                                : 'bg-[var(--color-bg-light)] border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]/50'
                                                }`}
                                        >
                                            {item.icon && <item.icon className="w-5 h-5" />}
                                            <span className="text-xs font-bold capitalize">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="font-bold text-sm font-serif text-[var(--color-text-main)]">Dining Style</Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'street_food', label: 'Street', icon: Coffee },
                                        { id: 'family', label: 'Family', icon: UtensilsCrossed },
                                        { id: 'fine_dining', label: 'Fine', icon: Wine }
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setTripData(prev => ({ ...prev, restaurant_type: item.id }))}
                                            className={`py-4 px-1 rounded-xl flex flex-col items-center gap-2 transition-all border ${tripData.restaurant_type === item.id
                                                ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-primary)]'
                                                : 'bg-[var(--color-bg-light)] border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]/50'
                                                }`}
                                        >
                                            {item.icon && <item.icon className="w-5 h-5" />}
                                            <span className="text-xs font-bold capitalize truncate w-full text-center" title={item.label}>{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Transport */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[var(--color-bg-secondary)]/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
                                <Car className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--color-text-main)] font-serif">Transport</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Main Mode Toggle */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setTripData(prev => ({ ...prev, transport_mode: 'personal' }))}
                                    className={`h-24 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold transition-all border-2 ${tripData.transport_mode === 'personal'
                                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20'
                                        : 'bg-transparent border-[var(--color-bg-secondary)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-light)]'
                                        }`}
                                >
                                    <Car className="w-8 h-8" />
                                    <span>Personal</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTripData(prev => ({ ...prev, transport_mode: 'public' }))}
                                    className={`h-24 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold transition-all border-2 ${tripData.transport_mode === 'public'
                                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20'
                                        : 'bg-transparent border-[var(--color-bg-secondary)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-light)]'
                                        }`}
                                >
                                    <Bus className="w-8 h-8" />
                                    <span>Public</span>
                                </button>
                            </div>

                            {/* Personal Mode Options */}
                            {tripData.transport_mode === 'personal' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-3">
                                        <Label className="font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Select Vehicle</Label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { id: 'car', label: 'Car', icon: Car },
                                                { id: 'bike', label: 'Bike', icon: Bike },
                                                { id: 'bus', label: 'Bus', icon: Bus } // Changed from TT to Bus
                                            ].map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => setTripData(prev => ({ ...prev, vehicle_type: item.id }))}
                                                    className={`py-4 rounded-xl flex flex-col items-center gap-2 transition-all border ${tripData.vehicle_type === item.id
                                                        ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-primary)]'
                                                        : 'bg-[var(--color-bg-light)] border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]/50'
                                                        }`}
                                                >
                                                    <item.icon className="w-5 h-5" />
                                                    <span className="text-xs font-bold capitalize">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Existing Mileage/Fuel Inputs */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <Label className="text-xs font-bold text-[var(--color-text-muted)]">Mileage</Label>
                                            <Input
                                                type="number"
                                                value={tripData.mileage}
                                                onChange={(e) => setTripData(prev => ({ ...prev, mileage: e.target.value === '' ? '' : parseInt(e.target.value) }))}
                                                placeholder="km/L"
                                                className="h-10 bg-[var(--color-bg-light)] border-transparent text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs font-bold text-[var(--color-text-muted)]">Fuel Price</Label>
                                            <Input
                                                type="number"
                                                value={tripData.fuel_price}
                                                onChange={(e) => setTripData(prev => ({ ...prev, fuel_price: e.target.value === '' ? '' : parseInt(e.target.value) }))}
                                                placeholder="₹/L"
                                                className="h-10 bg-[var(--color-bg-light)] border-transparent text-sm"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Public Mode Options */}
                            {tripData.transport_mode === 'public' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="space-y-3"
                                >
                                    <Label className="font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Transport Type</Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { id: 'train', label: 'Train', icon: Train },
                                            { id: 'bus', label: 'Bus', icon: Bus },
                                            { id: 'auto', label: 'Car/Bike', icon: Car } // Using Car icon for general auto/cab
                                        ].map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => setTripData(prev => ({ ...prev, public_transport_type: item.id }))}
                                                className={`py-4 rounded-xl flex flex-col items-center gap-2 transition-all border ${tripData.public_transport_type === item.id
                                                    ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-primary)]'
                                                    : 'bg-[var(--color-bg-light)] border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]/50'
                                                    }`}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span className="text-xs font-bold capitalize">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Quick Booking Links */}
                                    {tripData.public_transport_type && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="pt-2"
                                        >
                                            <Label className="font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3 block">Quick Booking</Label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {tripData.public_transport_type === 'train' && (
                                                    <>
                                                        <a href="https://www.irctc.co.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-light)] transition-colors text-xs font-bold text-[var(--color-text-main)]">
                                                            <ExternalLink className="w-3 h-3" /> IRCTC (Official)
                                                        </a>
                                                        <a href="https://www.confirmtkt.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-light)] transition-colors text-xs font-bold text-[var(--color-text-main)]">
                                                            <ExternalLink className="w-3 h-3" /> ConfirmTkt
                                                        </a>
                                                        <a href="https://www.ixigo.com/trains" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-light)] transition-colors text-xs font-bold text-[var(--color-text-main)] col-span-2">
                                                            <ExternalLink className="w-3 h-3" /> Ixigo
                                                        </a>
                                                    </>
                                                )}
                                                {tripData.public_transport_type === 'bus' && (
                                                    <>
                                                        <a href="https://ksrtc.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-light)] transition-colors text-xs font-bold text-[var(--color-text-main)] col-span-2">
                                                            <ExternalLink className="w-3 h-3" /> KSRTC (Official)
                                                        </a>
                                                        <a href="https://www.redbus.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-light)] transition-colors text-xs font-bold text-[var(--color-text-main)]">
                                                            <ExternalLink className="w-3 h-3" /> RedBus
                                                        </a>
                                                        <a href="https://www.abhibus.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-light)] transition-colors text-xs font-bold text-[var(--color-text-main)]">
                                                            <ExternalLink className="w-3 h-3" /> AbhiBus
                                                        </a>
                                                    </>
                                                )}
                                                {tripData.public_transport_type === 'auto' && (
                                                    <>
                                                        <a href="https://nammayatri.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-light)] transition-colors text-xs font-bold text-[var(--color-text-main)] col-span-2">
                                                            <ExternalLink className="w-3 h-3" /> Namma Yatri
                                                        </a>
                                                        <a href="https://book.olacabs.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-light)] transition-colors text-xs font-bold text-[var(--color-text-main)]">
                                                            <ExternalLink className="w-3 h-3" /> Ola
                                                        </a>
                                                        <a href="https://m.uber.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-light)] transition-colors text-xs font-bold text-[var(--color-text-main)]">
                                                            <ExternalLink className="w-3 h-3" /> Uber
                                                        </a>
                                                        <a href="https://www.rapido.bike/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-light)] transition-colors text-xs font-bold text-[var(--color-text-main)] col-span-2">
                                                            <ExternalLink className="w-3 h-3" /> Rapido
                                                        </a>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !tripData.name || !tripData.destinations[0]}
                        className="w-full py-5 rounded-[2rem] bg-[var(--color-primary)] text-white font-black text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-hover)] transition-all active:scale-95 border border-[var(--color-accent)]/20"
                    >
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5" /> {editTripId ? 'Update Trip' : 'Generate Trip'}</>}
                    </button>

                </div>
            </motion.div>
        </div>
    );
}
