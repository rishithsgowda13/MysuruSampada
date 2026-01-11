import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, DollarSign, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HotelCard({ hotel, isSelected, onToggle, index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={onToggle}
            className={`glass-card rounded-2xl p-4 relative cursor-pointer transition-all ${isSelected ? 'ring-2 ring-cyan-400' : 'hover:bg-white/10'
                }`}
        >
            {/* Select Indicator */}
            {isSelected && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                </div>
            )}

            <h4 className="font-semibold text-lg pr-12 mb-2">{hotel.name}</h4>

            {/* Type Badge */}
            <Badge className="bg-gray-500/20 text-gray-300 border-0 mb-3">
                {hotel.type || 'Mid-range'}
            </Badge>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1 text-green-400">
                    <DollarSign className="w-4 h-4" />
                    ₹{hotel.price_per_night} /night
                </span>
                {hotel.rating && (
                    <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        {hotel.rating}
                    </span>
                )}
            </div>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {hotel.amenities.slice(0, 4).map((amenity, i) => (
                        <Badge key={i} variant="outline" className="border-white/20 text-gray-300 text-xs">
                            {amenity}
                        </Badge>
                    ))}
                </div>
            )}

            {/* Description */}
            {hotel.description && (
                <p className="text-sm text-gray-400 italic line-clamp-2">"{hotel.description}"</p>
            )}
        </motion.div>
    );
}
