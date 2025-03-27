import { useHelper } from "@/composables/useHelper";

/**
 * =========================================================================
 * This is where the <battery> related api grouped.
 * For now, [ONLY] list of battery are build because no db manipulation, yet.
 * =========================================================================
 */

export const useBattery = () => {
    const { getAuthToken } = useHelper();

    const getBatteries = async () => {
        // Get Token from helper.
        const token = getAuthToken();
        const batteries = ref([]);
        const errorMessage = ref('');

        try {
            const { data, error } = await useFetch('/api/battery/list', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (error.value) {
                errorMessage.value = error.value.message || "Failed to fetch batteries.";
                console.error("Error fetching batteries:", errorMessage.value);
                return { batteries: [], error: errorMessage.value };
            }

            batteries.value = data.value || [];
            return { batteries: batteries.value, error: null };
        } catch (err) {
            errorMessage.value = err.message || "An unexpected error occurred.";
            console.error("Unexpected error:", errorMessage.value);
            return { batteries: [], error: errorMessage.value };
        }
    };

    return { getBatteries };
};
