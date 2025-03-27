
/**
 * ============================================================================================
 * Unlike composables/API/useBattery
 * This build is specifically to play around with localStorage since no DB integration, yet.
 * ============================================================================================
 */

import { ref, watchEffect } from "vue";
export const useBattery = () => {
    const batteries = ref([]);

    const latestId = computed(() => {
        if (batteries.value.length === 0) return null;
        return Math.max(...batteries.value.map(battery => battery.id));
    });

    const loadBatteries = () => {
        if (typeof window !== "undefined") {
            batteries.value = JSON.parse(localStorage.getItem("batteries")) || [];
        }
    };

    /**
     * ==================================================================================
     * ID should be auto-incremented; BUT there's no integration to db,  YET.
     * Once there's an integration; Save function is expected to return SOMETHING; 
     * 
     * WITH MESSAGE ERROR from the server, perhaps. than, we'll use alert components....
     * 
     * Save batteries to localStorage
     * ==================================================================================
     */
    const saveBatteries = (battery) => {
        battery.id = latestId.value + 1;
        batteries.value.push(battery);
        localStorage.setItem("batteries", JSON.stringify(batteries.value));
    };

    /**
     * ==================================================================================
     * No db integration, Update, Create Or Delete These all action to manipulate data in localStorage.
     * ==================================================================================
     */
    const updateBattery = (updatedBattery) => {

        const index = batteries.value.findIndex(battery => battery.id === updatedBattery.id);
        if (index !== -1) {
            batteries.value[index] = updatedBattery;
            localStorage.setItem("batteries", JSON.stringify(batteries.value));
        }
    };

    const getBatteries = () => {
        loadBatteries(); // Load the latest data
        return batteries;
    };

    const findBatteryById = (id) => {
        return batteries.value.find((battery) => battery.id == id) || null;
    };

    const deleteBattery = (id) => {
        batteries.value = batteries.value.filter((b) => b.id != id);
        localStorage.setItem("batteries", JSON.stringify(batteries.value));
    };

    // Ensure batteries are loaded when the composable is used
    watchEffect(() => {
        loadBatteries();
    });

    return { getBatteries, findBatteryById, saveBatteries, deleteBattery, updateBattery };
};
