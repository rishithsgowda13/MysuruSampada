
// Generic LocalStorage Entity Handler
class MockEntity {
    constructor(name) {
        this.name = name;
        this.storageKey = `base44_${name}`;
    }

    _getAll() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    _saveAll(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    async create(data) {
        const items = this._getAll();
        const newItem = {
            id: Math.random().toString(36).substring(2, 9),
            created_date: new Date().toISOString(),
            ...data
        };
        items.push(newItem);
        this._saveAll(items);
        return newItem;
    }

    async list(sortParams) {
        let items = this._getAll();
        if (sortParams === '-created_date') {
            items.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        }
        return items;
    }

    async filter(criteria) {
        const items = this._getAll();
        return items.filter(item => {
            return Object.keys(criteria).every(key => item[key] == criteria[key]);
        });
    }

    async update(id, data) {
        const items = this._getAll();
        const index = items.findIndex(i => i.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...data };
            this._saveAll(items);
            return items[index];
        }
        throw new Error('Item not found');
    }

    async delete(id) {
        const items = this._getAll();
        this._saveAll(items.filter(i => i.id !== id));
        return { success: true };
    }
}

// Mock LLM Response Generator for Mysore
const generateMockItinerary = (prompt) => {
    console.log("Generating mock AI response for:", prompt);
    // Simple heuristic response based on prompt keywords, defaults to Mysore plan
    return {
        total_distance_km: 120,
        days: [
            {
                day_number: 1,
                distance_km: 15,
                estimated_cost: 2500,
                places: [
                    {
                        name: "Mysore Palace",
                        type: "palace",
                        description: "Historical palace and royal residence.",
                        estimated_cost: 100,
                        duration: "2 hours",
                        rating: 4.8,
                        best_time: "Morning"
                    },
                    {
                        name: "Jaganmohan Palace",
                        type: "museum",
                        description: "Art gallery and museum.",
                        estimated_cost: 50,
                        duration: "1.5 hours",
                        rating: 4.5,
                        best_time: "Afternoon"
                    }
                ],
                restaurants: [
                    {
                        name: "RRR",
                        cuisine: "Andhra",
                        type: "Casual",
                        cost_for_two: 800,
                        rating: 4.6,
                        must_try: ["Biryani"]
                    }
                ],
                hotels: [
                    {
                        name: "Royal Orchid Metropole",
                        type: "Heritage",
                        price_per_night: 5000,
                        rating: 4.7,
                        amenities: ["Pool", "Spa"]
                    }
                ],
                schedule: [
                    { time: "10:00 AM", activity: "Visit Mysore Palace", duration: "2h" },
                    { time: "01:00 PM", activity: "Lunch at RRR", duration: "1h" },
                    { time: "03:00 PM", activity: "Jaganmohan Palace", duration: "1.5h" }
                ]
            },
            {
                day_number: 2,
                distance_km: 40,
                estimated_cost: 1500,
                places: [
                    {
                        name: "Chamundi Hill",
                        type: "temple",
                        description: "Ancient temple on a hill.",
                        estimated_cost: 0,
                        duration: "2 hours",
                        rating: 4.7
                    },
                    {
                        name: "Mysore Zoo",
                        type: "zoo",
                        description: "One of the oldest and largest zoos in India.",
                        estimated_cost: 100,
                        duration: "3 hours",
                        rating: 4.6
                    }
                ],
                restaurants: [
                    {
                        name: "Mylari",
                        cuisine: "South Indian",
                        type: "Simple",
                        cost_for_two: 300,
                        rating: 4.8,
                        must_try: ["Dosa"]
                    }
                ],
                schedule: [
                    { time: "08:00 AM", activity: "Chamundi Hill Visit", duration: "2h" },
                    { time: "11:00 AM", activity: "Breakfast at Mylari", duration: "1h" },
                    { time: "01:00 PM", activity: "Mysore Zoo", duration: "3h" }
                ]
            }
        ]
    };
};

export const base44 = {
    auth: {
        me: async () => ({ email: 'traveler@mysuru.app', name: 'Traveler' }),
        logout: () => {
            console.log('Logging out...');
            localStorage.clear();
            window.location.href = '/login';
        }
    },
    entities: {
        Trip: new MockEntity('Trip'),
        Itinerary: new MockEntity('Itinerary'),
        ChatMessage: new MockEntity('ChatMessage')
    },
    integrations: {
        Core: {
            InvokeLLM: async ({ prompt, response_json_schema }) => {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Return structured data for itinerary generation
                if (prompt.includes("travel itinerary")) {
                    return generateMockItinerary(prompt);
                }
                return {};
            }
        }
    }
};
