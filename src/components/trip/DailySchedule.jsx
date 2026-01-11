import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

export default function DailySchedule({ schedule }) {
    if (!schedule || schedule.length === 0) {
        return (
            <div className="glass-card rounded-2xl p-6 text-center text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No schedule available</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {schedule.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card rounded-2xl p-4 flex items-start gap-4"
                >
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                            <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        {index < schedule.length - 1 && (
                            <div className="w-0.5 h-8 bg-white/10 mt-2" />
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-0 mb-2">
                            {item.time}
                        </Badge>
                        <h4 className="font-semibold text-lg">{item.activity}</h4>
                        {item.duration && (
                            <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                                <Clock className="w-4 h-4" />
                                {item.duration}
                            </div>
                        )}
                    </div>

                    {/* Cost */}
                    {item.cost > 0 && (
                        <Badge className="bg-green-500/20 text-green-400 border-0">
                            ₹{item.cost}
                        </Badge>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
