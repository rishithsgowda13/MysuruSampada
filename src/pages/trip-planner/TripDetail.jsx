import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Star, Plus, Check, X, ArrowRight, ChevronRight, Share2, Download, User, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TravelAILayout from './TravelAILayout';

const TripDetail = () => {
    const [activeTab, setActiveTab] = useState('Places');
    const [activeDay, setActiveDay] = useState(1);

    const tripData = {
        places: [
            { id: 1, title: "Doddabetta Peak", desc: "The highest peak in the Nilgiris at 2,623 meters, offering panoramic views of the surrounding valleys and a telescope house for enhanced vistas.", tags: ["Viewpoint", "Moderate"], price: "₹10", time: "2h", rating: 4.4, season: "March to June, September to November" },
            { id: 2, title: "Ooty Botanical Garden", desc: "A 55-acre garden featuring over 650 species of plants, identifying a 20-million-year-old fossilized tree trunk and the Toda Hill viewpoint.", tags: ["Garden", "Easy"], price: "₹30", time: "2h", rating: 4.5, season: "March to June, September to November" },
            { id: 3, title: "Ooty Lake", desc: "A 65-acre lake ideal for boating, surrounded by eucalyptus trees and Nilgiri ranges, with options for paddle, motor, and rowing boats.", tags: ["Lake", "Easy"], price: "₹15", time: "2h", rating: 4.3, season: "March to June, September to November" },
            { id: 4, title: "Ooty Lake", desc: "A 65-acre lake ideal for boating, surrounded by eucalyptus trees and Nilgiri ranges, with options for paddle, motor, and rowing boats.", tags: ["Lake", "Easy"], price: "₹15", time: "2h", rating: 4.3, season: "March to June, September to November" }
        ],
        hotels: [
            { id: "h1", title: "Sinclairs Retreat Ooty", tags: ["Mid-range"], price: "₹3200 /night", rating: 4.1, amenities: ["Free Wi-Fi", "Restaurant", "Bar", "Room Service"], desc: "Known for its colonial architecture and proximity to major attractions." },
            { id: "h2", title: "Gem Park Ooty", tags: ["Mid-range"], price: "₹3500 /night", rating: 4.0, amenities: ["Free Wi-Fi", "Restaurant", "Spa", "Fitness Center"], desc: "Provides a relaxing stay with modern amenities and a well-maintained garden." },
            { id: "h3", title: "Sinclairs Retreat Ooty", tags: ["Mid-range"], price: "₹3200 /night", rating: 4.1, amenities: ["Free Wi-Fi", "Restaurant", "Room Service", "Parking"], desc: "Known for its hospitality and comfortable accommodations amidst nature." },
            { id: "h4", title: "Gem Park Ooty", tags: ["Mid-range"], price: "₹3500 /night", rating: 4.0, amenities: ["Free Wi-Fi", "Spa", "Restaurant", "Swimming Pool"], desc: "Provides a relaxing stay with modern amenities and a serene environment." }
        ],
        restaurants: [
            { id: "r1", title: "Earl's Secret", cuisine: "Indian, Continental", tags: ["Family Restaurant", "non veg"], price: "₹800 for 2", rating: 4.3, hours: "11:00 AM - 10:00 PM", mustTry: ["Mutton Biryani", "Chicken Tikka", "Fish Curry"] },
            { id: "r2", title: "Nahar's Sidewalk Café", cuisine: "Indian, Chinese, Continental", tags: ["Family Restaurant", "non veg"], price: "₹700 for 2", rating: 4.2, hours: "8:00 AM - 10:00 PM", mustTry: ["Chicken Shawarma", "Mutton Korma", "Vegetable Biryani"] },
            { id: "r3", title: "Earl's Secret", cuisine: "Indian, Continental", tags: ["Family Restaurant", "non veg"], price: "₹800 for 2", rating: 4.3, hours: "11:00 AM - 10:00 PM", mustTry: ["Mutton Biryani", "Chicken Tikka", "Fish Curry"] },
            { id: "r4", title: "Nahar's Sidewalk Café", cuisine: "Indian, Chinese, Continental", tags: ["Family Restaurant", "non veg"], price: "₹700 for 2", rating: 4.2, hours: "8:00 AM - 10:00 PM", mustTry: [] }
        ]
    };

    return (
        <TravelAILayout>
            <div className="max-w-6xl mx-auto">

                {/* Day Tabs - Matches Screenshot exactly */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide px-1">
                    {[1, 2, 3, 4, 5].map(day => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={`flex-1 min-w-[120px] py-2 rounded-full border transition-all duration-300 pill-btn ${activeDay === day ? 'active' : 'inactive'
                                }`}
                        >
                            <span className="block text-xs opacity-70 uppercase tracking-widest font-semibold mb-0.5">MAR 1{4 + day}</span>
                            <span className="block text-sm font-bold">Day {day}</span>
                        </button>
                    ))}
                </div>

                {/* Segmented Control Matches Screenshot */}
                <div className="segment-control p-1.5 rounded-2xl mb-8 flex w-full">
                    {['Daily Plan', 'Places', 'Hotels', 'Restaurants'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab
                                ? 'bg-[#2D68FF] text-white shadow-lg'
                                : 'text-white/40 hover:text-white/80'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6 pl-1">
                    <div className="w-1 h-5 bg-[#00CEFF] rounded-full shadow-[0_0_10px_#00CEFF]"></div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Selected {activeTab}</h2>
                    <span className="text-white/30 text-lg font-medium">({
                        activeTab === 'Places' ? 15 : 10
                    })</span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* HOTELS CARD - Exact Match */}
                    {activeTab === 'Hotels' && tripData.hotels.map((hotel, idx) => (
                        <div key={idx} className="glass-card rounded-[24px] p-6 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
                            {/* Content Wrapper */}
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="bg-[#2D3455] text-[#9BA8D9] text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                        {hotel.tags[0]}
                                    </span>
                                    <span className="text-white font-bold text-lg tracking-tight">{hotel.price}</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4 pr-12">{hotel.title}</h3>

                                <div className="flex gap-2 flex-wrap mb-5">
                                    {hotel.amenities.map(t => (
                                        <span key={t} className="px-3 py-1 rounded-full border border-white/10 text-[11px] text-white/50 bg-white/5">{t}</span>
                                    ))}
                                </div>

                                <p className="text-sm text-white/40 italic mb-4 border-l-2 border-[#2D68FF] pl-3 py-1">"{hotel.desc}"</p>

                                <div className="flex justify-end pt-2">
                                    <div className="flex items-center gap-1.5 text-yellow-400 font-bold bg-yellow-400/10 px-3 py-1 rounded-full">
                                        <Star size={14} fill="currentColor" /> {hotel.rating}
                                    </div>
                                </div>

                                {/* Circular Check Button - Correct Position */}
                                <button className="absolute top-12 right-0 w-10 h-10 rounded-full bg-[#00CEFF] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,206,255,0.4)] hover:scale-110 transition-transform">
                                    <Check size={20} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* RESTAURANTS CARD - Exact Match */}
                    {activeTab === 'Restaurants' && tripData.restaurants.map((rest, idx) => (
                        <div key={idx} className="glass-card rounded-[24px] p-6 relative overflow-hidden hover:border-white/20 transition-all duration-300">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{rest.title}</h3>
                                    <p className="text-sm text-white/50 mb-4">{rest.cuisine}</p>
                                </div>
                                {/* Circular X Button */}
                                <button className="w-8 h-8 rounded-full bg-[#FF4B4B]/20 text-[#FF4B4B] flex items-center justify-center hover:bg-[#FF4B4B] hover:text-white transition-all">
                                    <X size={18} strokeWidth={2.5} />
                                </button>
                            </div>

                            <div className="flex gap-2 mb-5">
                                {rest.tags.map(tag => (
                                    <span key={tag} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider ${tag === 'non veg' ? 'bg-[#3E1A22] text-[#FF4B4B] border border-[#FF4B4B]/20' : 'bg-[#182645] text-[#2D68FF] border border-[#2D68FF]/20'
                                        }`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                                <span className="text-[#00CEFF] font-bold text-lg">{rest.price}</span>
                                <div className="flex items-center gap-2 text-xs text-white/40">
                                    <Clock size={14} /> {rest.hours}
                                </div>
                            </div>

                            {rest.mustTry.length > 0 && (
                                <div className="space-y-2">
                                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Must Try</span>
                                    <div className="flex flex-wrap gap-2">
                                        {rest.mustTry.map(item => (
                                            <span key={item} className="px-3 py-1 rounded-lg bg-[#00CEFF]/10 text-[#00CEFF] border border-[#00CEFF]/20 text-xs font-medium">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="absolute bottom-6 right-6">
                                <div className="flex items-center gap-1 text-yellow-400 font-bold">
                                    <Star size={14} fill="currentColor" /> {rest.rating}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* PLACES CARD - Exact Match */}
                    {activeTab === 'Places' && tripData.places.map((place, idx) => (
                        <div key={idx} className="glass-card rounded-[24px] p-5 relative overflow-hidden flex gap-5 hover:border-white/20 transition-all duration-300">
                            {/* Circular X Button - Top Right Absolute */}
                            <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FF4B4B]/20 text-[#FF4B4B] flex items-center justify-center hover:bg-[#FF4B4B] hover:text-white transition-all z-20">
                                <X size={18} strokeWidth={2.5} />
                            </button>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                                <h3 className="text-lg font-bold text-white mb-2 pr-8">{place.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">{place.desc}</p>

                                <div className="flex gap-2 mb-5">
                                    {place.tags.map((tag, i) => (
                                        <span key={i} className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${i === 0 ? 'bg-[#182645] text-[#8DA9FF]' : 'bg-white/5 text-white/60'}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-xs pt-3 border-t border-white/5">
                                    <div className="flex gap-4">
                                        <span className="text-[#00CEFF] font-semi-bold">{place.price}</span>
                                        <span className="text-white/40 flex items-center gap-1"><Clock size={12} />{place.time}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="flex items-center gap-1 text-yellow-400 mb-0.5"><Star size={12} fill="currentColor" /> {place.rating}/5</span>
                                        <span className="text-[9px] text-white/30 flex items-center gap-1"><MapPin size={9} /> {place.season.split(',')[0]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </TravelAILayout>
    );
};

export default TripDetail;
