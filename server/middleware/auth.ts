import { defineEventHandler, getHeader, createError } from 'h3';

export default defineEventHandler((event) => {
    const url = event.node.req.url; // Get the requested URL

    // Ensure middleware applies ONLY to API routes
    if (!url.startsWith("/api/")) {
        return;
    }

    // Allow access to the login API
    if (url === "/api/user/auth") {
        return;
    }

    const authHeader = getHeader(event, "authorization");
    const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwiY29tcGxldGVuY2U6IkpvaG4gRG9lIiwiaWF0IjoxNjE2ODkzOTMwLCJleHBpcmVkX2luX3NlaW5kIjozMTY2MzY0NTExMX0.Y9Jr1sIWXQH7vMh8MXL3I_nU2V2-KLcdVtcmxexu1Vw";

    if (!authHeader || authHeader !== `Bearer ${hardcodedToken}`) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
});
