import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Calendar, Navigation, Fuel, DollarSign, Sparkles,
    Loader2, Clock, Star, X, Check, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import PlaceCard from './PlaceCard';
import HotelCard from './HotelCard';
import RestaurantCard from './RestaurantCard';
import DailySchedule from './DailySchedule';

export default function ItineraryTab({
    trip,
    itineraries,
    isGenerating,
    onGenerate,
    onUpdateItinerary,
    totalDistance,
    fuelCost
}) {
    const [selectedDay, setSelectedDay] = useState(1);
    const [subTab, setSubTab] = useState('daily');

    const currentItinerary = itineraries.find(i => i.day_number === selectedDay);
    const dayEstimatedCost = currentItinerary?.day_budget || 0;

    const togglePlaceSelection = (placeId) => {
        if (!currentItinerary) return;
        const updatedPlaces = (currentItinerary.places || []).map(p =>
            p.id === placeId ? { ...p, selected: !p.selected } : p
        );
        onUpdateItinerary(currentItinerary.id, { places: updatedPlaces });
    };

    const toggleHotelSelection = (hotelId) => {
        if (!currentItinerary) return;
        const updatedHotels = (currentItinerary.hotels || []).map(h => ({
            ...h,
            selected: h.id === hotelId
        }));
        onUpdateItinerary(currentItinerary.id, { hotels: updatedHotels });
    };

    const toggleRestaurantSelection = (restaurantId) => {
        if (!currentItinerary) return;
        const updatedRestaurants = (currentItinerary.restaurants || []).map(r =>
            r.id === restaurantId ? { ...r, selected: !r.selected } : r
        );
        onUpdateItinerary(currentItinerary.id, { restaurants: updatedRestaurants });
    };

    const removePlace = (placeId) => {
        if (!currentItinerary) return;
        const updatedPlaces = (currentItinerary.places || []).filter(p => p.id !== placeId);
        onUpdateItinerary(currentItinerary.id, { places: updatedPlaces });
    };

    const removeRestaurant = (restaurantId) => {
        if (!currentItinerary) return;
        const updatedRestaurants = (currentItinerary.restaurants || []).filter(r => r.id !== restaurantId);
        onUpdateItinerary(currentItinerary.id, { restaurants: updatedRestaurants });
    };

    if (itineraries.length === 0) {
        return (
            <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No itinerary yet</h3>
                <p className="text-gray-400 mb-6">Generate AI suggestions to create your trip plan</p>
                <button
                    onClick={onGenerate}
                    disabled={isGenerating}
                    className="gradient-btn px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Generate AI Itinerary
                        </>
                    )}
                </button>
            </div>
        );
    }

    const selectedPlaces = (currentItinerary?.places || []).filter(p => p.selected);
    const selectedHotel = (currentItinerary?.hotels || []).find(h => h.selected);
    const selectedRestaurants = (currentItinerary?.restaurants || []).filter(r => r.selected);

    return (
        <div className="space-y-6">
            {/* Day Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {Array.from({ length: trip.number_of_days || 5 }, (_, i) => i + 1).map(day => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedDay === day
                                ? 'bg-cyan-500 text-white'
                                : 'glass-card text-gray-300 hover:bg-white/10'
                            }`}
                    >
                        <Calendar className="w-4 h-4" />
                        Day {day}
                    </button>
                ))}
            </div>

            {/* Sub Tabs */}
            <Tabs value={subTab} onValueChange={setSubTab}>
                <TabsList className="w-full bg-white/5 rounded-xl p-1">
                    <TabsTrigger value="daily" className="flex-1 rounded-lg data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                        Daily Plan
                    </TabsTrigger>
                    <TabsTrigger value="places" className="flex-1 rounded-lg data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                        Places
                    </TabsTrigger>
                    <TabsTrigger value="hotels" className="flex-1 rounded-lg data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                        Hotels
                    </TabsTrigger>
                    <TabsTrigger value="restaurants" className="flex-1 rounded-lg data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                        Restaurants
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="daily" className="mt-6">
                    {/* Day Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="glass-card rounded-xl p-3 flex items-center gap-3">
                            <Navigation className="w-5 h-5 text-cyan-400" />
                            <div>
                                <p className="text-xs text-gray-400">Distance</p>
                                <p className="font-semibold">{currentItinerary?.distance_km || 20} km</p>
                            </div>
                        </div>
                        <div className="glass-card rounded-xl p-3 flex items-center gap-3">
                            <Fuel className="w-5 h-5 text-purple-400" />
                            <div>
                                <p className="text-xs text-gray-400">Fuel Cost</p>
                                <p className="font-semibold">₹{Math.round((currentItinerary?.distance_km || 20) / 15 * 100)}</p>
                            </div>
                        </div>
                        <div className="glass-card rounded-xl p-3 flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-pink-400" />
                            <div>
                                <p className="text-xs text-gray-400">Estimated Cost</p>
                                <p className="font-semibold">₹{dayEstimatedCost}</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="font-semibold mb-4">Daily Schedule</h3>
                    <DailySchedule schedule={currentItinerary?.schedule || []} />
                </TabsContent>

                <TabsContent value="places" className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-400" />
                            Selected Places ({selectedPlaces.length})
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AnimatePresence>
                            {(currentItinerary?.places || []).map((place, index) => (
                                <PlaceCard
                                    key={place.id}
                                    place={place}
                                    onToggle={() => togglePlaceSelection(place.id)}
                                    onRemove={() => removePlace(place.id)}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </TabsContent>

                <TabsContent value="hotels" className="mt-6">
                    {selectedHotel && (
                        <div className="mb-6">
                            <h3 className="font-semibold flex items-center gap-2 mb-4">
                                <Check className="w-5 h-5 text-green-400" />
                                Selected Hotel
                            </h3>
                            <HotelCard hotel={selectedHotel} isSelected onToggle={() => { }} />
                        </div>
                    )}

                    <h3 className="font-semibold flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        Available Options ({(currentItinerary?.hotels || []).length})
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(currentItinerary?.hotels || []).map((hotel, index) => (
                            <HotelCard
                                key={hotel.id}
                                hotel={hotel}
                                isSelected={hotel.selected}
                                onToggle={() => toggleHotelSelection(hotel.id)}
                                index={index}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="restaurants" className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-400" />
                            Selected Restaurants ({selectedRestaurants.length})
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AnimatePresence>
                            {(currentItinerary?.restaurants || []).map((restaurant, index) => (
                                <RestaurantCard
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                    onToggle={() => toggleRestaurantSelection(restaurant.id)}
                                    onRemove={() => removeRestaurant(restaurant.id)}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Generate More Button */}
            <button
                onClick={onGenerate}
                disabled={isGenerating}
                className="w-full glass-card rounded-xl p-4 flex items-center justify-center gap-2 text-cyan-400 hover:bg-white/10 transition-colors"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        Generate More Suggestions
                    </>
                )}
            </button>
        </div>
    );
}
