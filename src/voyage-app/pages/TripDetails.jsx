import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addDays } from "date-fns";
import {
    ArrowLeft, MapPin, Calendar, Users, Navigation,
    Fuel, DollarSign, Sparkles, Loader2, Copy, Check
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import OverviewTab from "@/components/trip/OverviewTab";
import ItineraryTab from "@/components/trip/ItineraryTab";
import ExpensesTab from "@/components/trip/ExpensesTab";

export default function TripDetails() {
    const { user: currentUser } = useAuth();
    const [searchParams] = useSearchParams();
    const [activeMainTab, setActiveMainTab] = useState('overview');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const queryClient = useQueryClient();

    const tripId = searchParams.get('id');

    const { data: trip, isLoading: tripLoading } = useQuery({
        queryKey: ['trip', tripId],
        queryFn: () => base44.entities.Trip.filter({ id: tripId }).then(r => r[0]),
        enabled: !!tripId
    });

    const { data: itineraries = [] } = useQuery({
        queryKey: ['itineraries', tripId],
        queryFn: () => base44.entities.Itinerary.filter({ trip_id: tripId }),
        enabled: !!tripId
    });

    const updateTripMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.Trip.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trip', tripId] })
    });

    const createItineraryMutation = useMutation({
        mutationFn: (data) => base44.entities.Itinerary.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['itineraries', tripId] })
    });

    const updateItineraryMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.Itinerary.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['itineraries', tripId] })
    });

    const generateInviteCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const copyInviteLink = () => {
        const link = `${window.location.origin}${createPageUrl(`TripDetails?id=${trip.id}`)}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        toast.success('Link copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    const generateAISuggestions = async () => {
        if (!trip) return;
        setIsGenerating(true);

        try {
            const prompt = `Create a detailed travel itinerary for a trip to ${trip.destination} from ${trip.start_place || 'starting point'}.
        Duration: ${trip.number_of_days || 5} days
        Travelers: ${trip.number_of_travellers || 1}
        Budget: ${trip.budget_type || 'moderate'}
        Food preference: ${(trip.food_preferences || []).join(', ') || 'All'}
        Restaurant type: ${trip.restaurant_type || 'family'}
        Hotel type: ${trip.hotel_type || 'mid_range'}
        
        For each day provide:
        1. 4-5 places to visit with: name, type (viewpoint/garden/lake/museum/temple/beach), description, estimated cost in INR (₹), duration in hours, rating out of 5, best time to visit
        2. 2-3 restaurants with: name, cuisine type, type (family/fine_dining/street_food), food type (veg/non_veg), cost for 2 in INR, timing, must try dishes
        3. 1 hotel with: name, type, price per night in INR, rating, amenities
        4. Daily schedule with time slots
        
        Use realistic Indian place names and prices.`;

            const response = await base44.integrations.Core.InvokeLLM({
                prompt,
                add_context_from_internet: true,
                response_json_schema: {
                    type: "object",
                    properties: {
                        total_distance_km: { type: "number" },
                        days: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    day_number: { type: "number" },
                                    places: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                name: { type: "string" },
                                                type: { type: "string" },
                                                description: { type: "string" },
                                                estimated_cost: { type: "number" },
                                                duration: { type: "string" },
                                                rating: { type: "number" },
                                                best_time: { type: "string" },
                                                difficulty: { type: "string" }
                                            }
                                        }
                                    },
                                    restaurants: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                name: { type: "string" },
                                                cuisine: { type: "string" },
                                                type: { type: "string" },
                                                food_type: { type: "string" },
                                                cost_for_two: { type: "number" },
                                                timing: { type: "string" },
                                                must_try: { type: "array", items: { type: "string" } },
                                                rating: { type: "number" }
                                            }
                                        }
                                    },
                                    hotels: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                name: { type: "string" },
                                                type: { type: "string" },
                                                price_per_night: { type: "number" },
                                                rating: { type: "number" },
                                                amenities: { type: "array", items: { type: "string" } },
                                                description: { type: "string" }
                                            }
                                        }
                                    },
                                    schedule: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                time: { type: "string" },
                                                activity: { type: "string" },
                                                duration: { type: "string" },
                                                cost: { type: "number" }
                                            }
                                        }
                                    },
                                    distance_km: { type: "number" },
                                    estimated_cost: { type: "number" }
                                }
                            }
                        }
                    }
                }
            });

            if (response?.days) {
                for (const day of response.days) {
                    const date = trip.start_date
                        ? format(addDays(new Date(trip.start_date), day.day_number - 1), 'yyyy-MM-dd')
                        : null;

                    await createItineraryMutation.mutateAsync({
                        trip_id: tripId,
                        day_number: day.day_number,
                        date,
                        places: (day.places || []).map((p, i) => ({ ...p, id: `place-${day.day_number}-${i}`, selected: true })),
                        restaurants: (day.restaurants || []).map((r, i) => ({ ...r, id: `rest-${day.day_number}-${i}`, selected: true })),
                        hotels: (day.hotels || []).map((h, i) => ({ ...h, id: `hotel-${day.day_number}-${i}`, selected: i === 0 })),
                        schedule: day.schedule || [],
                        distance_km: day.distance_km || 0,
                        day_budget: day.estimated_cost || 0
                    });
                }

                if (response.total_distance_km) {
                    await updateTripMutation.mutateAsync({
                        id: tripId,
                        data: { total_distance: response.total_distance_km }
                    });
                }
            }
        } catch (error) {
            console.error('Error generating suggestions:', error);
            toast.error('Failed to generate suggestions');
        }

        setIsGenerating(false);
    };

    if (tripLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Trip not found</p>
                    <Link to={createPageUrl('Home')}>
                        <button className="mt-4 px-6 py-2 rounded-full glass-card">Go Home</button>
                    </Link>
                </div>
            </div>
        );
    }

    const sortedItineraries = [...itineraries].sort((a, b) => a.day_number - b.day_number);
    const inviteCode = generateInviteCode();

    // Calculate totals
    const totalDistance = trip.total_distance || sortedItineraries.reduce((sum, i) => sum + (i.distance_km || 0), 0);
    const fuelCost = Math.round((totalDistance / 15) * 100); // Assuming 15 km/L and ₹100/L
    const totalExpenses = Object.values(trip.expenses || {}).reduce((sum, val) => sum + (val || 0), 0);

    return (
        <div className="px-4 py-6 pb-32">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link to={createPageUrl('Home')}>
                    <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </Link>
            </div>

            {/* Trip Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6 mb-6"
            >
                <h1 className="text-2xl font-bold mb-1">{trip.name}</h1>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{trip.destination}</span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span>{trip.number_of_days || 0} days</span>
                    <span>•</span>
                    <span>{trip.number_of_travellers || 1} travelers</span>
                </div>
            </motion.div>

            {/* Main Tabs */}
            <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
                <TabsList className="w-full bg-white/5 rounded-full p-1 mb-6">
                    <TabsTrigger
                        value="overview"
                        className="flex-1 rounded-full data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="itinerary"
                        className="flex-1 rounded-full data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                    >
                        Itinerary
                    </TabsTrigger>
                    <TabsTrigger
                        value="expenses"
                        className="flex-1 rounded-full data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                    >
                        Expenses
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <OverviewTab
                        trip={trip}
                        totalDistance={totalDistance}
                        fuelCost={fuelCost}
                        totalExpenses={totalExpenses}
                        inviteCode={inviteCode}
                        onCopyLink={copyInviteLink}
                        copied={copied}
                    />
                </TabsContent>

                <TabsContent value="itinerary">
                    <ItineraryTab
                        trip={trip}
                        itineraries={sortedItineraries}
                        isGenerating={isGenerating}
                        onGenerate={generateAISuggestions}
                        onUpdateItinerary={(id, data) => updateItineraryMutation.mutate({ id, data })}
                        totalDistance={totalDistance}
                        fuelCost={fuelCost}
                    />
                </TabsContent>

                <TabsContent value="expenses">
                    <ExpensesTab
                        trip={trip}
                        onUpdateExpenses={(expenses) => updateTripMutation.mutate({ id: tripId, data: { expenses } })}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
