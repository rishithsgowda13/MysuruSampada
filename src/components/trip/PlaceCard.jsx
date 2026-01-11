import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, Clock, DollarSign, Calendar, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const typeColors = {
    viewpoint: 'bg-blue-500/20 text-blue-400',
    garden: 'bg-green-500/20 text-green-400',
    lake: 'bg-cyan-500/20 text-cyan-400',
    museum: 'bg-purple-500/20 text-purple-400',
    temple: 'bg-amber-500/20 text-amber-400',
    beach: 'bg-sky-500/20 text-sky-400',
    park: 'bg-emerald-500/20 text-emerald-400',
    default: 'bg-gray-500/20 text-gray-400'
};

const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400',
    moderate: 'bg-yellow-500/20 text-yellow-400',
    hard: 'bg-red-500/20 text-red-400'
};

export default function PlaceCard({ place, onToggle, onRemove, index }) {
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
            {place.selected && (
                <div className="absolute top-3 right-12 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                </div>
            )}

            <h4 className="font-semibold text-lg pr-20 mb-2">{place.name}</h4>

            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{place.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={`${typeColors[place.type?.toLowerCase()] || typeColors.default} border-0`}>
                    {place.type}
                </Badge>
                {place.difficulty && (
                    <Badge className={`${difficultyColors[place.difficulty?.toLowerCase()] || difficultyColors.moderate} border-0`}>
                        {place.difficulty}
                    </Badge>
                )}
            </div>

            {/* Info Row */}
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                {place.estimated_cost > 0 && (
                    <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        ₹{place.estimated_cost}
                    </span>
                )}
                {place.duration && (
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {place.duration}
                    </span>
                )}
            </div>

            {/* Rating & Best Time */}
            <div className="flex items-center justify-between">
                {place.rating && (
                    <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        {place.rating}/5
                    </span>
                )}
                {place.best_time && (
                    <span className="flex items-center gap-1 text-xs text-pink-400">
                        <Calendar className="w-3 h-3" />
                        {place.best_time}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
