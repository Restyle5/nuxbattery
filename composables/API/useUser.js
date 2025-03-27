/**
 * ============================================================================
 * This is where the <user> related api grouped.
 * For now, [ONLY] list of battery are build because no db manipulation, yet.
 * =============================================================================
 */

export const useUser = () => {
    const authToken = useState('authToken', () => null);

    const login = async (username, password) => {
        try {
            const response = await $fetch('/api/user/auth', {
                method: 'POST',
                body: { username, password },
            });

            authToken.value = response.token; // Save token
            return { token: response.token, error: null }; // Success response
        } catch (error) {
            console.error('Login error:', error); // Debugging

            const errorMessage = error.data?.message || error.statusMessage || 'Login failed';

            return { token: null, error: errorMessage }; // Return error instead of throwing
        }
    };

    return {
        authToken,
        login,
    };
};
