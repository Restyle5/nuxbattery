<template>
    <div class="container mt-5">
        <h2>Create New Battery</h2>
        <!-- Calling the form component -->
        <BatteryForm :battery="newBattery" :isEditing="false" :onSave="saveBattery" />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
});

import { ref } from "vue";
import { useBattery } from "@/composables/useBattery";
import { useRouter } from "vue-router";
import BatteryForm from "@/components/form/battery/upsert.vue";

const router = useRouter();
const { saveBatteries } = useBattery();
const newBattery = ref({
    brand: "",
    model: "",
    voltage: null,
    price: null,
    warranty: null,
});

/**
 * Happy flow, for now, 
 * because validation checks doesn't do much without server validation.
 * the checks are handled in the form.
 */
const saveBattery = (battery) => {
    saveBatteries(battery);
    alert("Battery created successfully!");
    router.push("/battery/list");
};
</script>
