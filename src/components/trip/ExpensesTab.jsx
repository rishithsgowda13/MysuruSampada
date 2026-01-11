import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    DollarSign, Users, TrendingUp, Plus,
    UtensilsCrossed, Fuel, Hotel, Ticket, Car, Package
} from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
    { value: 'food', label: 'Food', icon: UtensilsCrossed, color: 'text-orange-400' },
    { value: 'fuel', label: 'Fuel', icon: Fuel, color: 'text-red-400' },
    { value: 'accommodation', label: 'Accommodation', icon: Hotel, color: 'text-purple-400' },
    { value: 'activities', label: 'Activities', icon: Ticket, color: 'text-green-400' },
    { value: 'transport', label: 'Transport', icon: Car, color: 'text-blue-400' },
    { value: 'misc', label: 'Miscellaneous', icon: Package, color: 'text-gray-400' }
];

export default function ExpensesTab({ trip, onUpdateExpenses }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newExpense, setNewExpense] = useState({
        category: 'food',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    const expenses = trip.expenses || {
        accommodation: 0,
        food: 0,
        transport: 0,
        fuel: 0,
        activities: 0,
        misc: 0
    };

    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + (val || 0), 0);
    const perPerson = Math.round(totalExpenses / (trip.number_of_travellers || 1));
    const transactionCount = Object.values(expenses).filter(v => v > 0).length;

    const handleAddExpense = () => {
        if (!newExpense.amount) return;

        const updatedExpenses = {
            ...expenses,
            [newExpense.category]: (expenses[newExpense.category] || 0) + parseFloat(newExpense.amount)
        };

        onUpdateExpenses(updatedExpenses);
        setNewExpense({
            category: 'food',
            amount: '',
            description: '',
            date: new Date().toISOString().split('T')[0]
        });
        setShowAddForm(false);
    };

    return (
        <div className="space-y-6">
            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-4"
            >
                <div className="glass-card rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">Total Expenses</span>
                        <DollarSign className="w-5 h-5 text-cyan-400" />
                    </div>
                    <p className="text-xl font-bold">₹{totalExpenses}</p>
                </div>

                <div className="glass-card rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">Per Person</span>
                        <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-xl font-bold">₹{perPerson}</p>
                </div>

                <div className="glass-card rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">Transactions</span>
                        <TrendingUp className="w-5 h-5 text-pink-400" />
                    </div>
                    <p className="text-xl font-bold">{transactionCount}</p>
                </div>
            </motion.div>

            {/* Add Expense Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full gradient-btn rounded-xl p-4 flex items-center justify-center gap-2 font-semibold"
            >
                <Plus className="w-5 h-5" />
                Add Expense
            </motion.button>

            {/* Add Expense Form */}
            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="glass-card rounded-2xl p-6 space-y-4"
                >
                    <h3 className="font-semibold">Add New Expense</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-gray-400 text-sm">Category</Label>
                            <Select
                                value={newExpense.category}
                                onValueChange={(v) => setNewExpense(prev => ({ ...prev, category: v }))}
                            >
                                <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1035] border-white/10">
                                    {CATEGORIES.map(cat => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="text-gray-400 text-sm">Amount (₹)</Label>
                            <Input
                                type="number"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                                placeholder="0"
                                className="mt-1 bg-white/5 border-white/10 text-white rounded-xl"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="text-gray-400 text-sm">Description</Label>
                        <Input
                            value={newExpense.description}
                            onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="What was this for?"
                            className="mt-1 bg-white/5 border-white/10 text-white rounded-xl"
                        />
                    </div>

                    <div>
                        <Label className="text-gray-400 text-sm">Date</Label>
                        <Input
                            type="date"
                            value={newExpense.date}
                            onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
                            className="mt-1 bg-white/5 border-white/10 text-white rounded-xl"
                        />
                    </div>

                    <button
                        onClick={handleAddExpense}
                        disabled={!newExpense.amount}
                        className="w-full gradient-btn rounded-xl p-3 font-semibold disabled:opacity-50"
                    >
                        Add Expense
                    </button>
                </motion.div>
            )}

            {/* Expense Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-6"
            >
                <h3 className="font-semibold mb-4">Expense Breakdown</h3>
                <div className="space-y-3">
                    {CATEGORIES.map(cat => {
                        const amount = expenses[cat.value] || 0;
                        const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;

                        return (
                            <div key={cat.value} className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl glass-card flex items-center justify-center ${cat.color}`}>
                                    <cat.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm">{cat.label}</span>
                                        <span className="font-semibold">₹{amount}</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Recent Expenses */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-2xl p-6"
            >
                <h3 className="font-semibold mb-4">Recent Expenses</h3>
                {transactionCount === 0 ? (
                    <p className="text-gray-400 text-center py-4">No expenses recorded yet</p>
                ) : (
                    <div className="space-y-3">
                        {CATEGORIES.filter(cat => expenses[cat.value] > 0).map(cat => (
                            <div key={cat.value} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <cat.icon className={`w-5 h-5 ${cat.color}`} />
                                    <span>{cat.label}</span>
                                </div>
                                <span className="font-semibold">₹{expenses[cat.value]}</span>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
