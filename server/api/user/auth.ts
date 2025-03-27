export default defineEventHandler(async (event) => {
    const body = await readBody(event); // Get request body

    // Validate request body
    if (!body || !body.username || !body.password) {
        throw createError({ statusCode: 400, statusMessage: "Username and password are required" });
    }

    // Hardcoded credentials
    const validUsername = "123";
    const validPassword = "123";

    if (body.username !== validUsername || body.password !== validPassword) {
        throw createError({ statusCode: 401, statusMessage: "Invalid credentials" });
    }

    // Hardcoded token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwiY29tcGxldGVuY2U6IkpvaG4gRG9lIiwiaWF0IjoxNjE2ODkzOTMwLCJleHBpcmVkX2luX3NlaW5kIjozMTY2MzY0NTExMX0.Y9Jr1sIWXQH7vMh8MXL3I_nU2V2-KLcdVtcmxexu1Vw";

    return { token };
});
