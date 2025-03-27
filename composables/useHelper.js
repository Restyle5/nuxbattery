/**
 * ===========================
 * Contain common functions. 
 * ===========================
 */

export const useHelper = () => {
    const getAuthToken = () => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("authToken") || "";
        }
        return ""; // Return empty string if running on server
    };

    return { getAuthToken };
};