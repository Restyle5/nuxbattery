import authMiddleware from '~/server/middleware/auth'; // Import middleware

/**
 * ===========================================================================================
 * Keep it simple, no db integration yet, no ORM/MODEL/MIGRATION. 
 * Data are stored in string to make matter easier (IT SHOULD BE IN INTEGER (Foreign Key))
 * ===========================================================================================
 */

export default defineEventHandler((event) => {
    // Apply middleware manually
    authMiddleware(event);

    return [
        {
            "id": 1,
            "brand": "Astra",
            "model": "55D23L",
            "voltage": "12",
            "price": 280,
            "warranty": "12"
        },
        {
            "id": 2,
            "brand": "Astra",
            "model": "Gold 75D31R",
            "voltage": "12",
            "price": 350,
            "warranty": "18"
        },
        {
            "id": 3,
            "brand": "Century",
            "model": "Hybrid NS60L",
            "voltage": "12",
            "price": 300,
            "warranty": "15"
        },
        {
            "id": 4,
            "brand": "Amaron",
            "model": "46B24R",
            "voltage": "12",
            "price": 320,
            "warranty": "18"
        },
        {
            "id": 5,
            "brand": "Varta",
            "model": "AGM LN3",
            "voltage": "12",
            "price": 680,
            "warranty": "24"
        }
    ]
});