export const TripSchema = {
    "name": "Trip",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the trip"
        },
        "start_place": {
            "type": "string",
            "description": "Starting location"
        },
        "destination": {
            "type": "string",
            "description": "Main destination"
        },
        "start_date": {
            "type": "string",
            "format": "date"
        },
        "end_date": {
            "type": "string",
            "format": "date"
        },
        "number_of_days": {
            "type": "number"
        },
        "number_of_travellers": {
            "type": "number"
        },
        "budget_type": {
            "type": "string",
            "enum": [
                "budget",
                "moderate",
                "luxury"
            ],
            "default": "moderate"
        },
        "total_budget": {
            "type": "number",
            "description": "Total budget in INR"
        },
        "food_preferences": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "Dietary preferences"
        },
        "restaurant_type": {
            "type": "string",
            "enum": [
                "street_food",
                "family",
                "fine_dining"
            ],
            "default": "family"
        },
        "hotel_type": {
            "type": "string",
            "enum": [
                "hostel",
                "budget_hotel",
                "mid_range",
                "luxury",
                "resort"
            ],
            "default": "mid_range"
        },
        "travel_mode": {
            "type": "string",
            "enum": [
                "car",
                "flight",
                "train",
                "bus",
                "mixed"
            ],
            "default": "car"
        },
        "interests": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "cover_image": {
            "type": "string"
        },
        "members": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "Email addresses of trip members"
        },
        "owner": {
            "type": "string",
            "description": "Email of trip owner"
        },
        "status": {
            "type": "string",
            "enum": [
                "planning",
                "confirmed",
                "ongoing",
                "completed"
            ],
            "default": "planning"
        },
        "total_distance": {
            "type": "number",
            "description": "Total trip distance in km"
        },
        "expenses": {
            "type": "object",
            "properties": {
                "accommodation": {
                    "type": "number"
                },
                "food": {
                    "type": "number"
                },
                "transport": {
                    "type": "number"
                },
                "activities": {
                    "type": "number"
                },
                "fuel": {
                    "type": "number"
                },
                "misc": {
                    "type": "number"
                }
            }
        }
    },
    "required": [
        "name",
        "destination"
    ]
}
