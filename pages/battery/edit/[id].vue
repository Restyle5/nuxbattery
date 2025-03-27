<template>
    <div class="container mt-5">
        <h2 v-if="battery">Editing Battery: {{ battery.model }}</h2>
        <h2 v-else>Redirecting...</h2>
        <!-- Loading form component -->
        <BatteryForm v-if="battery" :battery="battery" :isEditing="true" :onSave="saveBattery" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBattery } from "@/composables/useBattery";
import { useRouter, useRoute } from "vue-router";
import BatteryForm from "@/components/form/battery/upsert.vue";

const router = useRouter();
const route = useRoute();
const { findBatteryById, updateBattery } = useBattery();

const battery = ref(null);

onMounted(() => {
    battery.value = findBatteryById(route.params.id);
    if (!battery.value) {
        router.push("/not-found");
    }
});

const saveBattery = (updatedBattery) => {

        /**
         * Happy flow, for now, 
         * because validation checks doesn't do much without server validation.
         * the checks are handled in the form.
         */
        updateBattery(updatedBattery);
        alert("Battery created successfully!");
        router.push("/battery/list");
};
</script>
