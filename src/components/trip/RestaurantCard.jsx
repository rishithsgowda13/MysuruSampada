import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, Clock, DollarSign, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RestaurantCard({ restaurant, onToggle, onRemove, index = 0 }) {
    const foodTypeColor = restaurant.food_type === 'non_veg' || restaurant.food_type === 'non-veg'
        ? 'bg-red-500/20 text-red-400'
        : 'bg-green-500/20 text-green-400';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card rounded-2xl p-4 relative"
        >
            {/* Remove Button */}
            <button
                onClick={onRemove}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>

            {/* Select Indicator */}
            {restaurant.selected && (
                <div className="absolute top-3 right-12 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                </div>
            )}

            <h4 className="font-semibold text-lg pr-20 mb-1">{restaurant.name}</h4>
            <p className="text-sm text-gray-400 mb-3">{restaurant.cuisine}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-blue-500/20 text-blue-400 border-0">
                    {restaurant.type?.replace('_', ' ') || 'Family Restaurant'}
                </Badge>
                <Badge className={`${foodTypeColor} border-0`}>
                    {restaurant.food_type === 'non_veg' || restaurant.food_type === 'non-veg' ? 'non veg' : 'veg'}
                </Badge>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center gap-4 mb-3">
                <span className="flex items-center gap-1 text-green-400">
                    <DollarSign className="w-4 h-4" />
                    ₹{restaurant.cost_for_two} for 2
                </span>
                {restaurant.rating && (
                    <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        {restaurant.rating}
                    </span>
                )}
            </div>

            {/* Timing */}
            {restaurant.timing && (
                <div className="flex items-center gap-1 text-sm text-gray-400 mb-3">
                    <Clock className="w-4 h-4" />
                    {restaurant.timing}
                </div>
            )}

            {/* Must Try */}
            {restaurant.must_try && restaurant.must_try.length > 0 && (
                <div>
                    <p className="text-xs text-gray-500 mb-1">Must Try:</p>
                    <div className="flex flex-wrap gap-1">
                        {restaurant.must_try.map((item, i) => (
                            <Badge key={i} className="bg-amber-500/20 text-amber-400 border-0 text-xs">
                                {item}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
