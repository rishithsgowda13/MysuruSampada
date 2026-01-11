export const ChatMessageSchema = {
    "name": "ChatMessage",
    "type": "object",
    "properties": {
        "trip_id": {
            "type": "string",
            "description": "Reference to the trip"
        },
        "sender_email": {
            "type": "string"
        },
        "sender_name": {
            "type": "string"
        },
        "message": {
            "type": "string"
        },
        "message_type": {
            "type": "string",
            "enum": [
                "text",
                "system",
                "suggestion"
            ],
            "default": "text"
        }
    },
    "required": [
        "trip_id",
        "message"
    ]
}
