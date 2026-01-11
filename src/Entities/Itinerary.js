export const ItinerarySchema = {
    "name": "Itinerary",
    "type": "object",
    "properties": {
        "trip_id": {
            "type": "string",
            "description": "Reference to the trip"
        },
        "day_number": {
            "type": "number"
        },
        "date": {
            "type": "string",
            "format": "date"
        },
        "places": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "estimated_cost": {
                        "type": "number"
                    },
                    "duration": {
                        "type": "string"
                    },
                    "rating": {
                        "type": "number"
                    },
                    "best_time": {
                        "type": "string"
                    },
                    "difficulty": {
                        "type": "string"
                    },
                    "selected": {
                        "type": "boolean"
                    }
                }
            }
        },
        "restaurants": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "cuisine": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "food_type": {
                        "type": "string"
                    },
                    "cost_for_two": {
                        "type": "number"
                    },
                    "timing": {
                        "type": "string"
                    },
                    "must_try": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "rating": {
                        "type": "number"
                    },
                    "selected": {
                        "type": "boolean"
                    }
                }
            }
        },
        "hotels": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "price_per_night": {
                        "type": "number"
                    },
                    "rating": {
                        "type": "number"
                    },
                    "amenities": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "description": {
                        "type": "string"
                    },
                    "selected": {
                        "type": "boolean"
                    }
                }
            }
        },
        "schedule": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "time": {
                        "type": "string"
                    },
                    "activity": {
                        "type": "string"
                    },
                    "duration": {
                        "type": "string"
                    },
                    "cost": {
                        "type": "number"
                    }
                }
            }
        },
        "distance_km": {
            "type": "number"
        },
        "day_budget": {
            "type": "number"
        }
    },
    "required": [
        "trip_id",
        "day_number"
    ]
}
